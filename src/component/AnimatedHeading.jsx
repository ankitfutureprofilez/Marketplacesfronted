import React,{ useRef, useEffect, useState } from 'react'

export default function AnimatedHeading({ children }) {

    const [isVisible, setIsVisible] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // observer.disconnect();
                }else{
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        if (textRef.current) {
            observer.observe(textRef.current);
            
        }
        
        return () => {
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
        };
    }, []);

  return (
    <>
          <div ref={textRef} className={` slide-text ${isVisible ? 'visible' : ''}`}>
              {children}
          </div>
    </>
  )
}