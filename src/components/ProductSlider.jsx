import { useEffect, useRef, useState } from 'react';
import NewArrivalsCard from './NewArrivalsCard';

export const ProductSlider = ({ products }) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const pauseTimeoutRef = useRef(null);
  const scrollBackTimeoutRef = useRef(null);
  const isScrollingBackRef = useRef(false);
  const lastCardRef = useRef(null);
  const isPausedRef = useRef(false);
  const lastTimeRef = useRef(0);
  const scrollSpeed = 1; // Adjust scroll speed here

  // Animation logic
  const animate = (timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (isScrollingBackRef.current || isPausedRef.current) return;

    const container = containerRef.current;

    // Get the last card's position
    const lastCard = lastCardRef.current;
    const lastCardRect = lastCard?.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Check if last card is fully visible (with 10px margin)
    const isLastCardVisible = lastCardRect && (lastCardRect.right <= containerRect.right - 10);

    if (isLastCardVisible && !isHovering) {
      // Pause for 3 seconds at the end
      if (!pauseTimeoutRef.current) {
        isPausedRef.current = true;
        pauseTimeoutRef.current = setTimeout(() => {
          isScrollingBackRef.current = true;
          // Smoothly scroll back to start
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
          
          // Wait for the scroll to complete before resuming
          scrollBackTimeoutRef.current = setTimeout(() => {
            scrollPositionRef.current = 0;
            isScrollingBackRef.current = false;
            isPausedRef.current = false;
            pauseTimeoutRef.current = null;
            lastTimeRef.current = 0;
            if (!isHovering) {
              animationRef.current = requestAnimationFrame(animate);
            }
          }, 1000);
        }, 3000);
      }
      return;
    }

    // Skip animation frame if paused or hovering
    if (isHovering || isPausedRef.current) {
      return;
    }

    // Normal scrolling - adjust scroll speed based on frame rate
    const scrollAmount = scrollSpeed * (deltaTime / 16); // Normalize to 60fps
    scrollPositionRef.current += scrollAmount;
    container.scrollLeft = scrollPositionRef.current;
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle hover state changes
  useEffect(() => {
    if (isHovering) {
      // Pause animation when hovering
      cancelAnimationFrame(animationRef.current);
    } else {
      // Resume animation when not hovering
      lastTimeRef.current = 0;
      if (!isPausedRef.current && !isScrollingBackRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(animate);
      }
    }
  }, [isHovering]);

  // Initialize animation
  useEffect(() => {
    if (products.length > 0) {
      // Reset state when products change
      scrollPositionRef.current = 0;
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0;
      }
      isScrollingBackRef.current = false;
      isPausedRef.current = false;
      lastTimeRef.current = 0;
      
      // Start animation
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(pauseTimeoutRef.current);
      clearTimeout(scrollBackTimeoutRef.current);
    };
  }, [products.length]);

  return (
    <div 
      className='relative w-full flex px-5 overflow-scroll no-scrollbar'
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Marquee Container */}
      <div 
        className='flex w-max lg:grid-cols-3 gap-2 pl-14'
      >
        {/* <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'> */}
        {/* Double the products for seamless looping */}
        {[ ...products].map((item, index) => {
          // Mark the last card of the first set
          const isLastCard = index === products.length - 1;
          return (
            <div 
              ref={isLastCard ? lastCardRef : null} 
              key={`marquee-${item.id}-${index}`}
            >
              <NewArrivalsCard item={item}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};