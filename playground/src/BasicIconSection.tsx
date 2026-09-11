import * as Icons from '@snorose/icons';

const basicIcons = Object.entries(Icons).filter(
  ([name]) => name.startsWith('Icon') && !name.startsWith('IconMulti'),
);

export default function BasicIconSection({
  onClick,
}: {
  onClick: (name: string) => void;
}) {
  return (
    <section>
      <h1>Basic Icon</h1>

      <div>
        {basicIcons.map(([name, Component]) => (
          <Component
            key={name}
            aria-label={name}
            width={24}
            height={24}
            onClick={() => onClick(name)}
          />
        ))}
      </div>
    </section>
  );
}
