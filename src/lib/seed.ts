// src/lib/storage.ts
import { Produto } from "@/types/types";

export function seedProducts() {
  if (typeof window === "undefined") return;

  const alreadySeeded = localStorage.getItem("products");
  const alreadySeeded2 = localStorage.getItem("carouselProducts");

  if (!alreadySeeded && !alreadySeeded2) {
    const products: Produto[] = [
      {
        id: "1",
        title: "Console Nintendo Switch",
        description: "Console híbrido da Nintendo. Jogue em casa ou em qualquer lugar!",
        Iimage: "/Switch.png",
        price: 1999.99,
        Stock: 20,
      },
      {
        id: "2",
        title: "Jogos Mario Bros",
        description: "Coleção completa dos clássicos jogos do Mario Bros e família.",
        Iimage: "/mario.png",
        price: 299.9,
        Stock: 15,
      },
      {
        id: "3",
        title: "Nintendo Switch Pro",
        description: "Versão premium do Switch com controles aprimorados.",
        Iimage: "/switch_logo.png",
        price: 2499,
        Stock: 8,
      },
      
    ];

    const carouselProducts: Produto[] = [
      {
        id: "4",
        title: "It Takes Two",
        description: "Jogo cooperativo de aventura e quebra-cabeças.",
        Iimage: "/covers/it_takes_two.jpeg",
        price: 60,
        Stock: 10,
      },
      {
        id: "5",
        title: "Mario Kart 8 Deluxe",
        description: "Corridas caóticas com os personagens clássicos da Nintendo.",
        Iimage: "/covers/mario_odyssei.webp",
        price: 300,
        Stock: 5,
      },
      {
        id: "6",
        title: "Zelda: Breath of the Wild",
        description: "Aventura em mundo aberto com liberdade total.",
        Iimage: "/covers/zelda_botw.jpeg",
        price: 300,
        Stock: 8,
      },
      {
        title: "Streets of Rage 4",
        description: "Beat 'em up com arte desenhada à mão e trilha retrô.",
        Iimage: "/img7.png",
        id: "7",
        price: 110,
        Stock: 4
      },
      {
        title: "Cuphead",
        description: "Estética de desenho animado dos anos 30 com ação hardcore.",
        Iimage: "/img8.png",
        id: "8",
        price: 100,
        Stock: 9
      },
      {
        title: "Castlevania Anniversary Collection",
        description: "Coletânea com os clássicos 8-bit e 16-bit da série.",
        Iimage: "/img9.png",
        id: "9",
        price: 80,
        Stock: 1
      },
      {
        title: "TMNT: Shredder's Revenge",
        description: "Tartarugas Ninja com visual retrô e ação cooperativa.",
        Iimage: "/img10.png",
        id: "10",
        price: 130,
        Stock: 3
      },
      {
        title: "Hollow Knight",
        description: "Metroidvania atmosférico com combate desafiador e arte linda.",
        Iimage: "/img11.png",
        id: "11",
        price: 90,
        Stock: 120
      },
      {
        title: "Celeste",
        description: "Plataforma 2D sobre superação com trilha sonora incrível.",
        Iimage: "/img12.png",
        id: "12",
        price: 70,
        Stock: 6
      },
      {
        title: "Dead Cells",
        description: "Roguevania com combate rápido e níveis gerados proceduralmente.",
        Iimage: "/img13.png",
        id: "13",
        price: 100,
        Stock: 0
      },
      {
        title: "Hades",
        description: "Rogue-like com narrativa forte e combate fluido no submundo grego.",
        Iimage: "/img14.png",
        id: "14",
        price: 120,
        Stock: 7
      },
      {
        title: "Ori and the Blind Forest",
        description: "Plataforma e aventura com visuais deslumbrantes e história emocionante.",
        Iimage: "/img15.png",
        id: "15",
        price: 110,
        Stock: 12
      },
    ];

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("carouselProducts", JSON.stringify(carouselProducts));
    window.location.reload();
    
  }
}
