import { useEffect, useState } from 'react';

export default function Snow() {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 4 + 3}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.2,
      size: `${Math.random() * 4 + 2}px`
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flakes.map((flake) => (
        <div key={flake.id} className="absolute rounded-full bg-white animate-[fall_linear_infinite]"
          style={{
            left: flake.left, top: '-10px', width: flake.size, height: flake.size,
            opacity: flake.opacity, animationDuration: flake.animationDuration, animationDelay: flake.animationDelay,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10px) translateX(0px); }
          100% { transform: translateY(100vh) translateX(20px); }
        }
      `}</style>
    </div>
  );
}