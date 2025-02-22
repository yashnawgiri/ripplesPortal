import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
}

export function Typewriter({ words, className }: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 30; // Speed for typing (faster)
    const deletingSpeed = 20; // Speed for deleting (faster)
    const wordPause = 1800; // Slightly shorter pause between words

    const type = () => {
      const currentWord = words.length > 0 ? words[currentWordIndex] : "";

      if (isDeleting) {
        // Deleting text
        setCurrentText((prev) => prev.slice(0, -1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        // Typing text
        if (currentText === currentWord) {
          // Word complete, wait before deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, wordPause);

          return;
        }
        setCurrentText(currentWord.slice(0, currentText.length + 1));
      }
    };

    const timer = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentWordIndex, isDeleting, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
