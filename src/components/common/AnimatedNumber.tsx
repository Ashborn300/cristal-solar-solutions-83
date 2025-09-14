import { useCountUp } from "@/hooks/useCountUp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

const AnimatedNumber = ({ 
  value, 
  suffix = "", 
  prefix = "", 
  duration = 2000, 
  delay = 0,
  className = ""
}: AnimatedNumberProps) => {
  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.3 });
  const count = useCountUp({ 
    end: value, 
    duration, 
    isVisible, 
    delay 
  });

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedNumber;