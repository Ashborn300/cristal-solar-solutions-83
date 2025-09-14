import { useState, useEffect } from "react";

interface UseCountUpProps {
  end: number;
  duration?: number;
  start?: number;
  isVisible: boolean;
  delay?: number;
}

export const useCountUp = ({ 
  end, 
  duration = 2000, 
  start = 0, 
  isVisible, 
  delay = 0 
}: UseCountUpProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const startValue = start;
      const endValue = end;
      const difference = endValue - startValue;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentCount = startValue + (difference * easeOutCubic);
        setCount(Math.floor(currentCount));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, duration, start, delay]);

  return count;
};