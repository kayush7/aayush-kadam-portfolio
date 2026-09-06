import { useEffect, useState } from 'react';

/**
 * Simulates typing out text character-by-character
 * @param text - The text to type
 * @param speed - Milliseconds per character
 * @param enabled - Whether typing is active (allows resetting)
 * @param onComplete - Callback when typing finishes
 */
export function useTypewriter(
  text: string,
  speed: number = 18,
  enabled: boolean = true,
  onComplete?: () => void,
) {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      return;
    }

    setDisplayed('');
    setIsTyping(true);

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => {
      window.clearInterval(id);
      setIsTyping(false);
    };
  }, [text, speed, enabled, onComplete]);

  return { displayed, isTyping };
}
