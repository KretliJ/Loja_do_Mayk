"use client";

import { ContainerFull } from "@/components/containerfull";
import { Carousel } from "@/components/Carousel";
import { Cards } from "@/components/cards";
import { Separator } from "@/components/separator";
import { Produto } from "@/types/types";
import { getGames } from "@/lib/api/games";
import { useState } from "react";

export default function TestPage() {
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const produtos: Produto[] = getGames();

  return (
    <ContainerFull>
      <section className="w-full max-w-[1200px] mx-auto px-4 py-8">
        <h2 className="text-4xl text-center mb-6" style={{
          color: "var(--text-primary)",
          fontFamily: "VCRMono",
          fontWeight: 200,
        }}>
          Explore mais jogos
        </h2>

        <Carousel>
          {produtos.map((p, idx) => (
            <Cards
              key={idx}
              produto={p}
              onComprar={(produto) => setProdutoSelecionado(produto)}
            />
          ))}
        </Carousel>

        <Separator />
      </section>
    </ContainerFull>
  );
}