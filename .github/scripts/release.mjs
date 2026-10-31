import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const run = (command, args) =>
  execFileSync(command, args, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'inherit'],
  }).trim();
const git = (...args) => run('git', args);
const json = (file) => JSON.parse(readFileSync(file, 'utf8'));
const statePath = () => join(process.env.RUNNER_TEMP, 'package-release.json');
const save = (state) => writeFileSync(statePath(), JSON.stringify(state));

export function minorVersion(version) {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(version);
  if (!match)
    throw new Error(`Expected a stable SemVer version, received ${version}`);
  return `${match[1]}.${Number(match[2]) + 1}.0`;
}

export function changelogEntry(version, notes) {
  return `## [${version}]\n\n${notes.trim()}\n\n`;
}

export function releaseNotes(changelog, version) {
  const heading = `## [${version}]\n\n`;
  const start = changelog.indexOf(heading);
  if (start < 0) throw new Error(`Missing changelog entry for ${version}`);
  return changelog
    .slice(start + heading.length)
    .split(/^## \[/m)[0]
    .trim();
}

async function optional(request) {
  try {
    return (await request()).data;
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

export async function prepare({ github, context, core }) {
  const pr = context.payload.pull_request;
  if (
    !pr?.merged ||
    pr.base.ref !== 'main' ||
    pr.head.ref !== 'dev' ||
    pr.head.repo.full_name !== `${context.repo.owner}/${context.repo.repo}`
  ) {
    throw new Error(
      'Only a merged dev → main PR from this repository can release.',
    );
  }
  git('config', 'user.name', 'github-actions[bot]');
  git(
    'config',
    'user.email',
    '41898282+github-actions[bot]@users.noreply.github.com',
  );
  git('fetch', 'origin', 'main', 'dev', '--tags');
  const marker = `Release-PR: ${context.repo.owner}/${context.repo.repo}#${pr.number}`;
  const existing = git(
    'log',
    '--first-parent',
    '--format=%H',
    '--fixed-strings',
    `--grep=${marker}`,
    `${pr.merge_commit_sha}..origin/main`,
  )
    .split('\n')
    .filter(Boolean);
  if (existing.length > 1)
    throw new Error('Multiple release commits found for this PR.');
  let sha = existing[0];
  let notes;
  let version;
  if (sha) {
    if (
      git('rev-parse', `${sha}^`) !== pr.merge_commit_sha ||
      !git('show', '-s', '--format=%B', sha).split('\n').includes(marker)
    ) {
      throw new Error('Release commit does not match the original merge.');
    }
    git('checkout', '--detach', sha);
    version = json('package.json').version;
    notes = releaseNotes(readFileSync('CHANGELOG.md', 'utf8'), version);
    core.info(`Resuming v${version} at ${sha}`);
  } else {
    if (git('rev-parse', 'origin/main') !== pr.merge_commit_sha) {
      throw new Error(
        'main advanced before release preparation. Release the latest dev → main PR.',
      );
    }
    git('checkout', '--detach', pr.merge_commit_sha);
    version = minorVersion(json('package.json').version);
    const tags = git(
      'tag',
      '--merged',
      pr.merge_commit_sha,
      '--sort=-version:refname',
    )
      .split('\n')
      .filter((tag) => /^v\d+\.\d+\.\d+$/.test(tag));
    const previous = tags[0];
    const { data } = await github.rest.repos.generateReleaseNotes({
      ...context.repo,
      tag_name: `v${version}`,
      target_commitish: pr.merge_commit_sha,
      ...(previous ? { previous_tag_name: previous } : {}),
    });
    notes = data.body;
    run('npm', [
      'version',
      version,
      '--no-git-tag-version',
      '--ignore-scripts',
    ]);
    let old = '# Changelog\n\n';
    try {
      old = readFileSync('CHANGELOG.md', 'utf8');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    writeFileSync(
      'CHANGELOG.md',
      `# Changelog\n\n${changelogEntry(version, notes)}${old.replace(/^# Changelog\s*/, '')}`,
    );
  }
  const tag = `v${version}`;
  const tagRef = git('tag', '--list', tag);
  if (tagRef && (!sha || git('rev-list', '-n', '1', tag) !== sha)) {
    throw new Error(`${tag} already points to another release.`);
  }
  save({
    version,
    tag,
    notes,
    sha,
    resumed: Boolean(sha),
    marker,
    merge: pr.merge_commit_sha,
  });
}

export async function persist() {
  const state = json(statePath());
  // Build generation must not silently add other source changes to a release.
  const changed = git('diff', '--name-only', 'HEAD')
    .split('\n')
    .filter(Boolean);
  const allowed = ['package.json', 'package-lock.json', 'CHANGELOG.md'];
  if (changed.some((file) => !allowed.includes(file))) {
    throw new Error(
      `Build changed tracked source files: ${changed.join(', ')}`,
    );
  }
  if (!state.sha) {
    git('add', '--', ...allowed);
    git('commit', '-m', `chore(release): ${state.tag}`, '-m', state.marker);
    state.sha = git('rev-parse', 'HEAD');
  }
  if (!git('tag', '--list', state.tag))
    git('tag', '-a', state.tag, '-m', state.tag, state.sha);
  // Atomic push prevents saving only the commit or only the tag. No force pushes.
  if (state.resumed) git('push', 'origin', `refs/tags/${state.tag}`);
  else
    git(
      'push',
      '--atomic',
      'origin',
      `${state.sha}:refs/heads/main`,
      `refs/tags/${state.tag}`,
    );
  save(state);
}

export async function publishedVersion(name, version, request = fetch) {
  const response = await request(
    `https://registry.npmjs.org/${encodeURIComponent(name)}/${version}`,
    { signal: AbortSignal.timeout(30_000) },
  );
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error(`npm registry lookup failed: ${response.status}`);
  return response.json();
}

export function verifyPublished(published, integrity) {
  if (!integrity || published.dist?.integrity !== integrity) {
    throw new Error(
      'This npm version contains a different package. Refusing to overwrite or skip it.',
    );
  }
}

export async function publish(
  { core },
  { npm = (args) => run('npm', args), registry = publishedVersion } = {},
) {
  const state = json(statePath());
  const pkg = json('package.json');
  // Compare the exact tarball on retries; npm pack does not record gitHead.
  const [pack] = JSON.parse(
    npm(['pack', '--json', '--pack-destination', process.env.RUNNER_TEMP]),
  );
  const published = await registry(pkg.name, state.version);
  if (published) {
    verifyPublished(published, pack.integrity);
    core.info(
      `${pkg.name}@${state.version} already contains this tarball; skipping npm publish.`,
    );
  } else {
    npm([
      'publish',
      join(process.env.RUNNER_TEMP, pack.filename),
      '--access',
      'public',
      '--tag',
      'latest',
      '--registry',
      'https://registry.npmjs.org',
    ]);
  }
}

export async function createRelease(
  { github, context, core },
  { npmPublished = false } = {},
) {
  const state = json(statePath());
  const pkg = json('package.json');
  const release = await optional(() =>
    github.rest.repos.getReleaseByTag({ ...context.repo, tag: state.tag }),
  );
  const npmStatus = npmPublished
    ? `\`npm install ${pkg.name}@${state.version}\``
    : 'npm 자동 배포를 건너뛰었습니다 (npm 배포 미완료).';
  const body = `${state.notes}\n\n### npm\n\n${npmStatus}\n`;
  if (!release) {
    await github.rest.repos.createRelease({
      ...context.repo,
      tag_name: state.tag,
      target_commitish: state.sha,
      name: state.tag,
      body,
      draft: false,
      prerelease: false,
    });
  } else if (release.draft) {
    await github.rest.repos.updateRelease({
      ...context.repo,
      release_id: release.id,
      draft: false,
    });
  }
  // Existing notes may have been edited by a maintainer; preserve them on retry.
  await core.summary
    .addHeading(`Released ${pkg.name}@${state.version}`)
    .addLink(
      'Release notes',
      `https://github.com/${context.repo.owner}/${context.repo.repo}/releases/tag/${state.tag}`,
    )
    .write();
}

export async function enableSyncAutoMerge({ github, core }, pr) {
  if (pr.auto_merge) return;
  core.info(`Requesting auto-merge for synchronization PR: ${pr.html_url}`);
  await github.graphql(
    `mutation EnableReleaseSyncAutoMerge($pullRequestId: ID!) {
      enablePullRequestAutoMerge(input: {pullRequestId: $pullRequestId, mergeMethod: SQUASH}) {
        pullRequest { number }
      }
    }`,
    { pullRequestId: pr.node_id },
  );
  core.info(`Auto-merge enabled for synchronization PR: ${pr.html_url}`);
}

export async function sync({ github, context, core }) {
  const state = json(statePath());
  git('fetch', 'origin', 'dev');
  const branch = `automation/release-${state.tag}`;
  const { data: pulls } = await github.rest.pulls.list({
    ...context.repo,
    state: 'all',
    head: `${context.repo.owner}:${branch}`,
    base: 'dev',
  });
  if (pulls.some((pr) => pr.merged_at)) return;
  const open = pulls.find((pr) => pr.state === 'open');
  if (open) {
    await enableSyncAutoMerge({ github, core }, open);
    return;
  }
  // If already integrated, no synchronization PR is needed.
  if (
    ['package.json', 'package-lock.json', 'CHANGELOG.md'].every(
      (file) =>
        git('ls-tree', 'origin/dev', file) === git('ls-tree', state.sha, file),
    )
  )
    return;
  git('checkout', '-b', branch, 'origin/dev');
  try {
    git('cherry-pick', state.sha);
  } catch (error) {
    git('cherry-pick', '--abort');
    throw new Error(
      `Could not sync ${state.tag} to dev; resolve version/changelog differences manually.`,
      { cause: error },
    );
  }
  // Reuse an existing branch after a partial failure without overwriting it.
  const remote = git('ls-remote', '--heads', 'origin', `refs/heads/${branch}`);
  if (!remote) git('push', 'origin', `HEAD:refs/heads/${branch}`);
  const { data: pr } = await github.rest.pulls.create({
    ...context.repo,
    head: branch,
    base: 'dev',
    title: `chore(release): ${state.tag} 버전 및 릴리스 노트 동기화`,
    body: `- main의 ${state.tag} 버전 및 CHANGELOG.md 반영\n- GitHub Release 생성 후 자동 생성\n\nhttps://github.com/${context.repo.owner}/${context.repo.repo}/releases/tag/${state.tag}`,
  });
  await enableSyncAutoMerge({ github, core }, pr);
}
