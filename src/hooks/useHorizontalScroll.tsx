import { useRef } from "react";

const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollAmount: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return { containerRef, handleScroll };
};

export default useHorizontalScroll;
