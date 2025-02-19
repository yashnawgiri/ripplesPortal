import { useState, useEffect, useRef } from "react";

type Props = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
};

const Typewriter = ({
  words,
  typingSpeed = 50,
  deletingSpeed = 10,
  pauseTime = 1000,
}: Props) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate max height based on longest word
  useEffect(() => {
    if (containerRef.current) {
      const updateHeight = () => {
        // Create a hidden div to measure text height
        const measureDiv = document.createElement('div');
        measureDiv.style.position = 'absolute';
        measureDiv.style.visibility = 'hidden';
        measureDiv.style.width = containerRef.current!.offsetWidth + 'px';
        measureDiv.style.fontSize = window.getComputedStyle(containerRef.current!).fontSize;
        measureDiv.style.fontFamily = window.getComputedStyle(containerRef.current!).fontFamily;
        measureDiv.style.whiteSpace = 'pre-wrap';
        measureDiv.style.lineHeight = window.getComputedStyle(containerRef.current!).lineHeight;
        
        // Find the tallest height among all words
        const maxHeight = Math.max(...words.map(word => {
          measureDiv.textContent = word;
          document.body.appendChild(measureDiv);
          const height = measureDiv.offsetHeight;
          document.body.removeChild(measureDiv);
          return height;
        }));

        // Add minimal padding based on screen size
        const padding = window.innerWidth < 768 ? 1 : 2;
        containerRef.current!.style.minHeight = `${maxHeight + padding}px`;
        containerRef.current!.style.lineHeight = '1.2';
      };

      // Initial height calculation
      updateHeight();

      // Update height on window resize
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [words]);

  // Existing typing effect logic
  useEffect(() => {
    let typingTimeout;

    const currentWord = words.length > 0 ? words[currentWordIndex] : "";

    if (isDeleting) {
      typingTimeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else {
      typingTimeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayedText === currentWord) {
      typingTimeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }

    return () => clearTimeout(typingTimeout);
  }, [
    displayedText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <div 
      ref={containerRef}
      className="typewriter bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent whitespace-pre-wrap break-words md:leading-normal leading-tight"
    >
      {displayedText}
      <span className="cursor bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-blink">
        |
      </span>
    </div>
  );
};

export default Typewriter;
