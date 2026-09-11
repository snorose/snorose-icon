import * as Icons from '@snorose/icons';

const illustrations = Object.entries(Icons).filter(([name]) =>
  name.startsWith('Illustration'),
);

export default function IllustrationSection({
  onClick,
}: {
  onClick: (name: string) => void;
}) {
  return (
    <section>
      <h1>Illustration</h1>
      <div>
        {illustrations.map(([name, Component]) => (
          <Component
            key={name}
            aria-label={name}
            width={80}
            height={80}
            onClick={() => onClick(name)}
          />
        ))}
      </div>
    </section>
  );
}
