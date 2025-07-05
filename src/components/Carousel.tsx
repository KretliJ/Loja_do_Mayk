// Lucas: Crair arquivo
// components/Carousel.tsx

// components/Carousel.tsx
"use client";

import { ReactNode, useRef, Children, cloneElement, isValidElement } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children: ReactNode;
}

export function Carousel({ children }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={() => scroll("left")}>
        ◀
      </button>

      <div className={styles.carouselTrack} ref={scrollRef}>
        {Children.map(children, (child) =>
          isValidElement(child)
            ? <div className={styles.carouselItem}>{child}</div>
            : child
        )}
      </div>

      <button className={styles.navButton} onClick={() => scroll("right")}>
        ▶
      </button>
    </div>
  );
}
