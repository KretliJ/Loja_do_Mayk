// Lucas: Criar componente

'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Cards } from './cards';
import type { Produto } from '@/types/types';

interface CarouselProps {
  produtos: Produto[];
  onComprar: (produto: Produto) => void;
  onVeiw: (produto: Produto) => void;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

export function Carousel({ produtos, onComprar, onVeiw, setCartCount }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full">
      {/* Botão Esquerda */}
      <button
      onClick={() => scroll("left")}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10
        bg-[color:var(--color-background)]/80 hover:bg-[color:var(--color-background)]/95
        text-[color:var(--color-txlight)] dark:text-[color:var(--color-txDark)]
        backdrop-blur-md p-2 rounded-2xl shadow-lg transition-all duration-300
        border border-gray-400/30 dark:border-gray-600/30"
      aria-label="Scroll para esquerda"
    >
      <ChevronLeft size={24} />
    </button>
    {/* Área de Cards */}
    <div
      ref={scrollRef}
      className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4 py-4 px-8"
    >
      {produtos.map((produto) => (
        <Cards
          key={produto.id}
          produto={produto}
          onComprar={onComprar}
          onVeiw={onVeiw}
          setCartCount={setCartCount}
        />
      ))}
    </div>
    {/* Botão Direita */}
    <button
      onClick={() => scroll("right")}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10
        bg-[color:var(--color-background)]/80 hover:bg-[color:var(--color-background)]/95
        text-[color:var(--color-txlight)] dark:text-[color:var(--color-txDark)]
        backdrop-blur-md p-2 rounded-2xl shadow-lg transition-all duration-300
        border border-gray-400/30 dark:border-gray-600/30"
      aria-label="Scroll para direita"
    >
      <ChevronRight size={24} />
    </button>


    </div>
  );
}