"use client";

import React, { useEffect, useState, useRef } from "react";

const imagens = [
  "/carousel-image/ps5-pro.jpeg",
  "/carousel-image/minecraft.jpg",
  "/supermariorpg.jpg",
  "/carousel-image/switch-oled.jpg",
  "/carousel-image/banner.jpg",
];



const TEMPO_AUTOPLAY:number = 8000; // 8s

const ImagemCarrossel = () => {
  const [indexAtual, setIndexAtual] = useState(1);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = imagens.length;

  const proximoSlide = () => {
    setIndexAtual((prev) => (prev + 1) % totalSlides);
  };

  const slideAnterior = () => {
    setIndexAtual((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // autoplay
  useEffect(() => {
    intervaloRef.current = setInterval(() => {
      proximoSlide();
    }, TEMPO_AUTOPLAY);

    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, []);

  const irParaSlide = (index: number) => {
    setIndexAtual(index);
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = setInterval(() => {
        proximoSlide();
      }, TEMPO_AUTOPLAY);
    }
  };

  return (
    <div className="relative w-full md:max-w-full max-h-[400px] mx-auto overflow-hidden">
      {/* Slides */}
      <div className="relative h-[400px] flex transition-transform duration-700 ease-in-out"
           style={{ transform: `translateX(-${indexAtual * 100}%)` }}>
        {imagens.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full flex justify-center items-center"
            style={{
              minWidth: "100%",
              transition: "opacity 0.8s ease",
              opacity: idx === indexAtual ? 1 : 0.3,
              transform: idx === indexAtual ? "scale(1)" : "scale(0.9)",
              filter: idx === indexAtual ? "none" : "blur(2px)",
            }}
          >
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="max-h-[400px] h-[400px] object-contain transition-all duration-700"
            />
          </div>
        ))}
      </div>

      {/* Setas de navegação */}
      <button
        onClick={slideAnterior}
        className="absolute hidden md:block left-40  top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-l-xl hover:bg-black/70 z-10"
      >
        ◀
      </button>
      <button
        onClick={proximoSlide}
        className="absolute hidden md:block right-40 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-r-xl hover:bg-black/70 z-10"
      >
        ▶
      </button>

      {/* Paginação (bolinhas) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {imagens.map((_, idx) => (
          <button
            key={idx}
            onClick={() => irParaSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagemCarrossel;
