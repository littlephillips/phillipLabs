import { useState, useEffect } from "react";

export function useTypewriter(words, typingSpeed = 80, deletingSpeed = 45, pauseMs = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const speed = deleting ? deletingSpeed : typingSpeed;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, charIndex + 1));
        if (charIndex + 1 === word.length) {
          setTimeout(() => setDeleting(true), pauseMs);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setText(word.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}
