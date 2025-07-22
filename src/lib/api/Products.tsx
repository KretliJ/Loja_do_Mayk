// src/hooks/useProducts.ts
import { Produto } from "../../types/types";
import { useEffect, useState } from "react";

export function useProducts(): Produto[] {
  const [products, setProducts] = useState<Produto[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("products");
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (error) {
        console.error("Erro ao ler products:", error);
      }
    }
  }, []);

  return products;
}

export function useCarouselProducts(): Produto[] {
  const [carousel, setCarousel] = useState<Produto[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("carouselProducts");
    if (stored) {
      try {
        setCarousel(JSON.parse(stored));
      } catch (error) {
        console.error("Erro ao ler carouselProducts:", error);
      }
    }
  }, []);

  return carousel;
}
