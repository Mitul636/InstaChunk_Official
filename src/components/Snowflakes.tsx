import { useEffect, useState } from "react";

export default function Snowflakes() {
  const [flakes, setFlakes] = useState<
    {
      id: number;
      left: number;
      animationDuration: number;
      animationDelay: number;
      opacity: number;
      size: number;
      drift: number;
    }[]
  >([]);

  useEffect(() => {
    // Generate fewer flakes on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const flakeCount = isMobile ? 30 : 75;

    const generatedFlakes = Array.from({ length: flakeCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // horizontal position percentage
      animationDuration: Math.random() * 7 + 8, // 8s to 15s fall duration
      animationDelay: Math.random() * 10, // 0s to 10s delay start
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 opacity
      size: Math.random() * 0.3 + 0.2, // 0.2rem to 0.5rem size
      drift: Math.random() * 100 - 50, // -50px to 50px horizontal drift
    }));

    setFlakes(generatedFlakes);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
      aria-hidden="true"
    >
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-5%] rounded-full bg-blue-100 blur-[1px]"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}rem`,
            height: `${flake.size}rem`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`,
            // @ts-ignore: Custom CSS variable for keyframes
            "--drift": `${flake.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
