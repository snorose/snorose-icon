import * as Icons from '@snorose/icons';

const multiIcons = Object.entries(Icons).filter(([name]) =>
  name.startsWith('IconMulti'),
);

export default function MultiIconSection({
  onClick,
}: {
  onClick: (name: string) => void;
}) {
  return (
    <section>
      <h1>Multi Icon</h1>
      <div>
        {multiIcons.map(([name, Component]) => (
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
