import { useEffect, useState, useRef, useCallback } from "react";

interface UseScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = ({ 
  threshold = 0.1, 
  rootMargin = "0px" 
}: UseScrollAnimationProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin]);

  return { isVisible, elementRef };
};

// Hook for multiple elements with staggered animations
export const useStaggeredScrollAnimation = ({ 
  threshold = 0.1, 
  rootMargin = "0px 0px -50px 0px" 
}: UseScrollAnimationProps = {}) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold, rootMargin }
    );

    const container = containerRef.current;
    if (container) {
      const children = container.querySelectorAll('[data-animate]');
      children.forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const getAnimationClass = useCallback((index: number, baseClass = 'scroll-animate') => {
    return `${baseClass} ${visibleItems.has(index) ? 'in-view' : ''} stagger-${Math.min(index + 1, 6)}`;
  }, [visibleItems]);

  return { containerRef, visibleItems, getAnimationClass };
};
