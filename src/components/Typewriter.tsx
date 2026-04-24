import { useState, useEffect } from 'react';

interface TypewriterProps {
  prefix: string;
  gradientText: string;
}

export function TypewriterHeading({ prefix, gradientText }: TypewriterProps) {
  const fullText = prefix + gradientText;
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedChars(i);
      if (i >= fullText.length) {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [fullText]);

  const currentPrefix = prefix.slice(0, typedChars);
  const currentGradient = typedChars > prefix.length ? gradientText.slice(0, typedChars - prefix.length) : '';

  return (
    <>
      <span className="inline-block page-load" style={{ '--delay': '200ms' } as any}>
        {currentPrefix}
        <br className="hidden md:block" />
        {currentGradient.length > 0 && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-light to-electric inline-block mt-2">
            {currentGradient}
          </span>
        )}
        <span className="typewriter-cursor"></span>
      </span>
    </>
  );
}
