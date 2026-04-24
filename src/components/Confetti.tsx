import { useEffect, useState } from 'react';

const colors = ['#FFC570', '#544798', '#EFD2B0', '#FFFFFF'];

export function Confetti() {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 50 }).map((_, i) => {
      const x = 50 + (Math.random() - 0.5) * 20; // Start near center
      const y = 50 + (Math.random() - 0.5) * 20;
      const angle = Math.random() * Math.PI * 2;
      const velocity = 20 + Math.random() * 30;
      return {
        id: i,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 20, // initial upward burst
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 20,
        size: 4 + Math.random() * 6
      };
    });
    setPieces(newPieces);
    
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      setPieces(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx * dt,
        y: p.y + p.vy * dt,
        vy: p.vy + 100 * dt, // gravity
        rotation: p.rotation + p.vr,
      })));
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.y > 110 ? 0 : 1
          }}
        />
      ))}
    </div>
  );
}
