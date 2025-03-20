import { useEffect, useRef, useState } from "react";

export function useScrollAnimation() {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry], observer) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Stop observing after animation triggers
                }
            },
            { threshold: 0.2 } // Adjust sensitivity (20% of element must be visible)
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect(); // Cleanup on unmount
    }, []);

    return [elementRef, isVisible];
}
