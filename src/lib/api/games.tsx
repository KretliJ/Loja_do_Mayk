// lib/api/games.tsx

import { Produto } from "@/types/types";

export function getGames(): Produto[] {
  return [
    {
      title: "It Takes Two",
      description: "Jogo cooperativo de aventura e quebra-cabeças.",
      Iimage: "/covers/it_takes_two.jpeg",
      id: "1",
      price: 60,
    },
    {
      title: "Mario Kart 8 Deluxe",
      description: "Corridas caóticas com os personagens clássicos da Nintendo.",
      Iimage: "/covers/mario_odyssei.webp",
      id: "2",
      price: 300,
    },
    {
      title: "Zelda: Breath of the Wild",
      description: "Aventura em mundo aberto com liberdade total.",
      Iimage: "/covers/zelda_botw.jpeg",
      id: "3",
      price: 300,
    },
    {
      title: "Sonic Mania",
      description: "Um retorno às raízes com fases e músicas retrô.",
      Iimage: "/img4.png",
      id: "4",
      price: 90,
    },
    {
      title: "Shovel Knight: Treasure Trove",
      description: "Plataforma 2D com estilo NES e gameplay refinado.",
      Iimage: "/img5.png",
      id: "5",
      price: 80,
    },
    {
      title: "Mega Man 11",
      description: "Clássico da Capcom com gráficos retrô-modernizados.",
      Iimage: "/img6.png",
      id: "6",
      price: 120,
    },
    {
      title: "Streets of Rage 4",
      description: "Beat 'em up com arte desenhada à mão e trilha retrô.",
      Iimage: "/img7.png",
      id: "7",
      price: 110,
    },
    {
      title: "Cuphead",
      description: "Estética de desenho animado dos anos 30 com ação hardcore.",
      Iimage: "/img8.png",
      id: "8",
      price: 100,
    },
    {
      title: "Castlevania Anniversary Collection",
      description: "Coletânea com os clássicos 8-bit e 16-bit da série.",
      Iimage: "/img9.png",
      id: "9",
      price: 80,
    },
    {
      title: "TMNT: Shredder’s Revenge",
      description: "Tartarugas Ninja com visual retrô e ação cooperativa.",
      Iimage: "/img10.png",
      id: "10",
      price: 130,
    },
    {
      title: "Hollow Knight",
      description: "Metroidvania atmosférico com combate desafiador e arte linda.",
      Iimage: "/img11.png",
      id: "11",
      price: 90,
    },
    {
      title: "Celeste",
      description: "Plataforma 2D sobre superação com trilha sonora incrível.",
      Iimage: "/img12.png",
      id: "12",
      price: 70,
    },
    {
      title: "Dead Cells",
      description: "Roguevania com combate rápido e níveis gerados proceduralmente.",
      Iimage: "/img13.png",
      id: "13",
      price: 100,
    },
    {
      title: "Hades",
      description: "Rogue-like com narrativa forte e combate fluido no submundo grego.",
      Iimage: "/img14.png",
      id: "14",
      price: 120,
    },
    {
      title: "Ori and the Blind Forest",
      description: "Plataforma e aventura com visuais deslumbrantes e história emocionante.",
      Iimage: "/img15.png",
      id: "15",
      price: 110,
    },
  ];
}
