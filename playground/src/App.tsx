import { useRef, useState, type ComponentType, type SVGProps } from 'react';
import BasicIconSection from './BasicIconSection';
import MultiIconSection from './MultiIconSection';
import IllustrationSection from './IllustrationSection';

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type IconItem = {
  name: string;
  Component: SvgComponent;
};

export function App() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} />`);
    setVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setVisible(false);
      timerRef.current = null;
    }, 2000);
  };

  return (
    <main>
      {visible && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            backgroundColor: '#484848F0',
            padding: '0.6rem 0.8rem',
            borderRadius: '0.5rem',
          }}
        >
          Copy!
        </div>
      )}

      <BasicIconSection onClick={handleCopy} />
      <MultiIconSection onClick={handleCopy} />
      <IllustrationSection onClick={handleCopy} />
    </main>
  );
}
