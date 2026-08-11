import { useEffect, useState } from 'react';

function createFlakes(count) {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${Math.random() * 100}%`,
    drift: `${Math.random() * 48 - 24}px`,
    duration: `${Math.random() * 6 + 7}s`,
    delay: `${Math.random() * -12}s`,
    opacity: Math.random() * 0.45 + 0.18,
    size: `${Math.random() * 3 + 2}px`,
  }));
}

export default function Snow() {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 767px)');

    const updateFlakes = () => {
      if (reducedMotion.matches) {
        setFlakes([]);
        return;
      }

      setFlakes(createFlakes(mobile.matches ? 18 : 36));
    };

    updateFlakes();
    reducedMotion.addEventListener('change', updateFlakes);
    mobile.addEventListener('change', updateFlakes);

    return () => {
      reducedMotion.removeEventListener('change', updateFlakes);
      mobile.removeEventListener('change', updateFlakes);
    };
  }, []);

  if (!flakes.length) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="absolute -top-3 rounded-full bg-white will-change-transform"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `mcwf-snowfall ${flake.duration} linear ${flake.delay} infinite`,
            '--snow-drift': flake.drift,
          }}
        />
      ))}

      <style>{`
        @keyframes mcwf-snowfall {
          from { transform: translate3d(0, -2vh, 0); }
          to { transform: translate3d(var(--snow-drift), 104vh, 0); }
        }
      `}</style>
    </div>
  );
}
