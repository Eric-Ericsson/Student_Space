// components/WritingEffect.js
import { useEffect, useState } from 'react';

const texts = ["Welcome to Student Space", "We are the best", "Stay tuned for more updates"];

const WritingEffect = () => {
  const [index, setIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isWriting, setIsWriting] = useState(true);

  useEffect(() => {
    let charIndex = 0;
    let timer;

    const type = () => {
      setCurrentText(texts[index].slice(0, charIndex));
      charIndex++;

      if (charIndex <= texts[index].length) {
        timer = setTimeout(type, 100);
      } else {
        setIsWriting(false);
        setTimeout(erase, 2000);
      }
    };

    const erase = () => {
      setCurrentText(texts[index].slice(0, charIndex));
      charIndex--;

      if (charIndex >= 0) {
        timer = setTimeout(erase, 50);
      } else {
        setIsWriting(true);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        timer = setTimeout(type, 1000);
      }
    };

    timer = setTimeout(type, 1000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="absolute inset-0 font-[Poppins] text-xl sm:text-3xl md:text-4xl font-bold text-light w-[80%] sm:w-[70%] md:w-[700px] drop-shadow-sm">
      {currentText}
      {isWriting && <span className="animate-pulse">_</span>}
    </div>
  );
};

export default WritingEffect;
