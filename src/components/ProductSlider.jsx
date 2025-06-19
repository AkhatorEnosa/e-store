import { useEffect, useRef, useState } from 'react';
import NewProductsCard from './NewProductsCard';

export const ProductSlider = ({ products }) => {
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const pauseTimeoutRef = useRef(null);
  const scrollBackTimeoutRef = useRef(null);
  const isScrollingBackRef = useRef(false);
  const lastCardRef = useRef(null);

  // Animation logic
  const animate = () => {
    if (isHovering || !marqueeRef.current || !containerRef.current || isScrollingBackRef.current) return;

    const container = containerRef.current;
    const marquee = marqueeRef.current;
    const containerWidth = container.offsetWidth;
    const marqueeWidth = marquee.scrollWidth / 2; // Since we duplicated the products

    // Get the last card's position
    const lastCard = lastCardRef.current;
    const lastCardRect = lastCard?.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Check if last card is fully visible (with 20px margin)
    const isLastCardVisible = lastCardRect && 
                             (lastCardRect.right <= containerRect.right - 20);

    if (isLastCardVisible) {
      // Pause for 3 seconds at the end
      if (!pauseTimeoutRef.current) {
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
            pauseTimeoutRef.current = null;
            animationRef.current = requestAnimationFrame(animate);
          }, 1000); // Match this with your scroll duration
        }, 3000);
      }
      return;
    }

    // Normal scrolling
    scrollPositionRef.current += 1.5; // Adjust speed here
    container.scrollLeft = scrollPositionRef.current;
    animationRef.current = requestAnimationFrame(animate);
  };

  // Initialize and clean up animation
  useEffect(() => {
    if (products.length > 0) {
      // Reset state when products change
      scrollPositionRef.current = 0;
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0;
      }
      isScrollingBackRef.current = false;
      
      // Start animation
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(pauseTimeoutRef.current);
      clearTimeout(scrollBackTimeoutRef.current);
    };
  }, [products.length, isHovering]);

  return (
    <div 
      className='relative w-full flex px-5 overflow-scroll no-scrollbar'
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Marquee Container */}
      <div 
        className='flex w-max lg:grid-cols-3 gap-2 md:gap-4 pl-14'
        ref={marqueeRef}
      >
        {/* Double the products for seamless looping */}
        {[...products, ...products].map((item, index) => {
          // Mark the last card of the first set
          const isLastCard = index === products.length - 1;
          return (
            <div 
              ref={isLastCard ? lastCardRef : null} 
              key={`marquee-${item.id}-${index}`}
            >
              <NewProductsCard item={item}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};