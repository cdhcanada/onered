import React, { useState, useEffect } from 'react';

const AnimatedText: React.FC = () => {
  const texts = [
    'نشتري لك من أفضل المواقع العالمية',
    'توصيل مجاني لجميع الولايات',
    'أسعار منافسة وجودة عالية',
    'خدمة عملاء متميزة 24/7'
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentTextIndex, texts]);

  return (
    <div className="h-12 md:h-16 flex items-center justify-center">
      <p className="text-base md:text-xl lg:text-2xl text-gray-300 font-bold px-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        {displayText}
        <span className="animate-pulse text-red-400">|</span>
      </p>
    </div>
  );
};

export default AnimatedText;