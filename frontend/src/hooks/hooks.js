import { useEffect, useRef, useState } from "react";

export function useScrollAnimation() {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry], observer) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); 
                }
            },
            { threshold: 0.2 } 
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect(); 
    }, []);

    return [elementRef, isVisible];
}
