import { useState, useEffect } from 'react';

const words = [
  "Minecraft Servers",
  "VPS Hosting",
  "Bot Hosting",
  "RDP Hosting",
  "Web Hosting"
];

export function WordCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-xl md:text-3xl font-display font-medium text-white mb-6 page-load" style={{ '--delay': '350ms' } as any}>
      Powerful hosting for <span key={index} className="cycling-word">{words[index]}</span>
    </div>
  );
}
