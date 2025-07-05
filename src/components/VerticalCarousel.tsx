// Lucas: Crair arquivo
// components/VerticalCarousel.tsx

"use client";

import { ReactNode, useRef, Children, isValidElement } from "react";
import styles from "./VerticalCarousel.module.css";

interface VerticalCarouselProps {
  children: ReactNode;
  height?: string; // agora será uma string CSS (ex: "500px")
}

export function VerticalCarousel({ children, height = "500px" }: VerticalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "up" | "down") => {
    if (!scrollRef.current) return;
    const { clientHeight } = scrollRef.current;
    scrollRef.current.scrollBy({
      top: direction === "up" ? -clientHeight : clientHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.container} style={{ maxHeight: height }}>
      <button onClick={() => scroll("up")} className={styles.button}>
        ▲
      </button>

      <div ref={scrollRef} className={styles.scrollArea}>
        <div className={styles.grid}>
          {Children.map(children, (child, idx) =>
            isValidElement(child) ? (
              <div key={idx} className={styles.gridItem}>
                {child}
              </div>
            ) : (
              child
            )
          )}
        </div>
      </div>

      <button onClick={() => scroll("down")} className={styles.button}>
        ▼
      </button>
    </div>
  );
}

