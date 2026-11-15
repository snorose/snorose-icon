import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import {
  minorVersion,
  changelogEntry,
  releaseNotes,
  prepare,
  persist,
  publishedVersion,
  verifyPublished,
  sync,
  publish,
  createRelease,
  enableSyncAutoMerge,
} from './release.mjs';

test('npm publish precedes Release creation; retries preserve notes and disabled publishing allows Release creation', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'icons-publish-test-'));
  const before = process.cwd();
  const oldTemp = process.env.RUNNER_TEMP;
  try {
    process.chdir(directory);
    process.env.RUNNER_TEMP = directory;
    writeFileSync(
      'package.json',
      JSON.stringify({ name: '@test/icons', version: '1.4.0' }),
    );
    writeFileSync(
      join(directory, 'package-release.json'),
      JSON.stringify({
        version: '1.4.0',
        tag: 'v1.4.0',
        sha: 'release-sha',
        notes: 'New icon',
      }),
    );
    const calls = [];
    let skipped = false;
    let existing = null;
    let metadata = null;
    let failPublish = false;
    const context = { repo: { owner: 'test', repo: 'icons' } };
    const summary = {
      addHeading() {
        return this;
      },
      addLink() {
        return this;
      },
      async write() {},
    };
    const core = { info() {}, summary };
    const github = {
      rest: {
        repos: {
          getReleaseByTag: async () => {
            if (!existing)
              throw Object.assign(new Error('Missing'), { status: 404 });
            return { data: existing };
          },
          createRelease: async (options) => {
            calls.push('release');
            assert.equal(options.tag_name, 'v1.4.0');
            assert.match(options.body, /New icon/);
            if (skipped) {
              assert.match(options.body, /npm 자동 배포를 건너뛰었습니다/);
              assert.doesNotMatch(options.body, /npm install/);
            } else {
              assert.match(options.body, /npm install @test\/icons@1.4.0/);
            }
          },
          updateRelease: async () => {
            calls.push('update');
          },
        },
      },
    };
    const dependencies = {
      npm: (args) => {
        calls.push(args[0]);
        if (args[0] === 'pack')
          return JSON.stringify([
            { filename: 'icons.tgz', integrity: 'sha512-test' },
          ]);
        if (failPublish) throw new Error('npm authentication failed');
      },
      registry: async () => metadata,
    };
    await publish({ github, context, core }, dependencies);
    await createRelease({ github, context, core }, { npmPublished: true });
    assert.deepEqual(calls, ['pack', 'publish', 'release']);
    calls.length = 0;
    metadata = { dist: { integrity: 'sha512-test' } };
    await publish({ github, context, core }, dependencies);
    await createRelease({ github, context, core }, { npmPublished: true });
    assert.deepEqual(calls, ['pack', 'release']);
    calls.length = 0;
    existing = { id: 1, body: 'Maintainer edits', draft: false };
    await publish({ github, context, core }, dependencies);
    await createRelease({ github, context, core }, { npmPublished: true });
    assert.deepEqual(calls, ['pack']);
    calls.length = 0;
    metadata = { dist: { integrity: 'sha512-different' } };
    await assert.rejects(
      publish({ github, context, core }, dependencies),
      /different package/,
    );
    assert.deepEqual(calls, ['pack']);
    calls.length = 0;
    metadata = null;
    existing = null;
    failPublish = true;
    await assert.rejects(
      publish({ github, context, core }, dependencies),
      /authentication failed/,
    );
    assert.deepEqual(calls, ['pack', 'publish']);
    calls.length = 0;
    skipped = true;
    await createRelease({ github, context, core });
    assert.deepEqual(calls, ['release']);
  } finally {
    process.chdir(before);
    if (oldTemp === undefined) delete process.env.RUNNER_TEMP;
    else process.env.RUNNER_TEMP = oldTemp;
    rmSync(directory, { recursive: true, force: true });
  }
});

test('minor resets patch and rejects unstable or malformed versions', () => {
  assert.equal(minorVersion('1.3.9'), '1.4.0');
  assert.equal(minorVersion('0.9.0'), '0.10.0');
  for (const value of ['1.3.0-beta.1', 'v1.3.0', '1.03.0', 'garbage'])
    assert.throws(() => minorVersion(value));
});

test('changelog round trip retains generated headings and previous releases', () => {
  const notes =
    "## What's Changed\n\n* Added icon (#145)\n\n## New Contributors\n\n* @contributor";
  const text = `# Changelog\n\n${changelogEntry('1.4.0', notes)}${changelogEntry('1.3.0', 'old')}`;
  assert.equal(releaseNotes(text, '1.4.0'), notes);
  assert.equal(releaseNotes(text, '1.3.0'), 'old');
  assert.throws(() => releaseNotes(text, '1.5.0'));
});

test('registry errors cannot masquerade as missing packages; retries verify integrity', async () => {
  assert.equal(
    await publishedVersion('@snorose/icons', '1.4.0', async () => ({
      status: 404,
    })),
    null,
  );
  for (const status of [401, 429, 500]) {
    await assert.rejects(
      publishedVersion('@snorose/icons', '1.4.0', async () => ({
        status,
        ok: false,
      })),
    );
  }
  const metadata = { dist: { integrity: 'sha512-example' } };
  assert.equal(
    await publishedVersion('@snorose/icons', '1.4.0', async () => ({
      ok: true,
      json: async () => metadata,
    })),
    metadata,
  );
  assert.doesNotThrow(() => verifyPublished(metadata, 'sha512-example'));
  assert.throws(() => verifyPublished(metadata, 'sha512-other'));
  assert.throws(() => verifyPublished({}, undefined));
});

test('prepare, atomic push, retry after main advances, and dev synchronization', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'icons-release-test-'));
  const before = process.cwd();
  const oldTemp = process.env.RUNNER_TEMP;
  const oldCache = process.env.npm_config_cache;
  const git = (...args) =>
    execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
  try {
    process.chdir(directory);
    process.env.RUNNER_TEMP = directory;
    process.env.npm_config_cache = join(directory, 'npm-cache');
    git('init', '-b', 'main', '.');
    git('config', 'user.name', 'Test');
    git('config', 'user.email', 'test@example.com');
    writeFileSync(
      'package.json',
      JSON.stringify({ name: '@test/icons', version: '1.3.9' }),
    );
    writeFileSync(
      'package-lock.json',
      JSON.stringify({
        name: '@test/icons',
        version: '1.3.9',
        lockfileVersion: 3,
        packages: { '': { name: '@test/icons', version: '1.3.9' } },
      }),
    );
    git('add', 'package.json', 'package-lock.json');
    git('commit', '-m', 'initial');
    git('tag', 'v1.3.9');
    git('checkout', '-b', 'dev');
    writeFileSync('icon.svg', '<svg/>');
    git('add', 'icon.svg');
    git('commit', '-m', 'feat: add icon');
    git('checkout', 'main');
    git('merge', '--no-ff', 'dev', '-m', 'merge: dev into main');
    const merge = git('rev-parse', 'HEAD');
    git('init', '--bare', 'origin.git');
    git('remote', 'add', 'origin', join(directory, 'origin.git'));
    git('push', 'origin', 'main', 'dev', '--tags');
    const context = {
      repo: { owner: 'test', repo: 'icons' },
      payload: {
        pull_request: {
          number: 145,
          merged: true,
          merge_commit_sha: merge,
          base: { ref: 'main' },
          head: { ref: 'dev', repo: { full_name: 'test/icons' } },
        },
      },
    };
    const notes = "## What's Changed\n\n* Added icon in #145";
    let created;
    let generateCalls = 0;
    let autoMergeCalls = 0;
    const github = {
      graphql: async (_query, variables) => {
        assert.equal(variables.pullRequestId, 'sync-pr-id');
        autoMergeCalls++;
      },
      rest: {
        repos: {
          generateReleaseNotes: async (options) => {
            generateCalls++;
            assert.equal(options.previous_tag_name, 'v1.3.9');
            return { data: { body: notes } };
          },
        },
        pulls: {
          list: async () => ({
            data: created
              ? [{ ...created, state: 'open', node_id: 'sync-pr-id' }]
              : [],
          }),
          create: async (options) => {
            created = options;
            return {
              data: {
                html_url: 'https://example.com/pr',
                node_id: 'sync-pr-id',
              },
            };
          },
        },
      },
    };
    const core = { info() {} };
    await prepare({ github, context, core });
    assert.equal(read('package.json').version, '1.4.0');
    assert.equal(read('package-lock.json').packages[''].version, '1.4.0');
    assert.equal(
      releaseNotes(readFileSync('CHANGELOG.md', 'utf8'), '1.4.0'),
      notes,
    );
    await persist();
    const released = git('rev-parse', 'HEAD');
    assert.equal(git('rev-parse', 'origin/main'), released);
    assert.equal(git('rev-list', '-n', '1', 'v1.4.0'), released);
    writeFileSync('later.txt', 'new work');
    git('add', 'later.txt');
    git('commit', '-m', 'later change');
    const newer = git('rev-parse', 'HEAD');
    git('push', 'origin', 'HEAD:main');
    await prepare({ github, context, core });
    await persist();
    assert.equal(git('rev-parse', 'origin/main'), newer);
    assert.equal(read('package.json').version, '1.4.0');
    assert.equal(generateCalls, 1);
    await sync({ github, context, core });
    assert.equal(autoMergeCalls, 1);
    await sync({ github, context, core });
    assert.equal(autoMergeCalls, 2);
    assert.equal(created.base, 'dev');
    assert.equal(created.head, 'automation/release-v1.4.0');
    assert.equal(read('package.json').version, '1.4.0');
    assert.equal(git('ls-tree', 'HEAD', 'later.txt'), '');
    context.payload.pull_request.number = 146;
    await assert.rejects(prepare({ github, context, core }), /main advanced/);
  } finally {
    process.chdir(before);
    if (oldTemp === undefined) delete process.env.RUNNER_TEMP;
    else process.env.RUNNER_TEMP = oldTemp;
    if (oldCache === undefined) delete process.env.npm_config_cache;
    else process.env.npm_config_cache = oldCache;
    rmSync(directory, { recursive: true, force: true });
  }
});

test('sync auto-merge preserves enabled requests and surfaces permission failures', async () => {
  const core = { info() {} };
  const github = {
    graphql: async () => {
      throw new Error('Auto-merge denied');
    },
  };
  await enableSyncAutoMerge(
    { github, core },
    { auto_merge: { enabled_by: {} } },
  );
  await assert.rejects(
    enableSyncAutoMerge({ github, core }, { node_id: 'sync-pr-id' }),
    /Auto-merge denied/,
  );
});
