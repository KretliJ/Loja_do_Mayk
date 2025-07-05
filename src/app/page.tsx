// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.
"use client"
import { Metadata } from "next";
import { Email } from "@/components/email";
import { ContainerFull } from "@/components/containerfull";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Faq } from "@/components/faq";
import { Separator } from "@/components/separator";
import { Producs } from "../components/producs";
import { Cards } from "../components/cards";
import { VendaModal } from "@/components/vendaModal";
import { useState } from "react";
import { Produto } from "@/types/types";

import { Carousel } from "@/components/Carousel";
import { getGames } from "@/lib/api/games";
import { VerticalCarousel } from "@/components/VerticalCarousel";
// export const metadata: Metadata = {
//   title: "MaykShop | Tecnologia e Games",
//   description: "Tecnologia e Games.",
// };

// Lucas: Adicionar layers no fundo da página principal, seguingo estilo retro
export default function Home() {

  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

  // Lucas: Mockup de items para o Carousel.
  const games: Produto[] = getGames();

  return (
    <ContainerFull>
      <section>
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h2
            className="text-4xl"
            style={{
              color: "var(--text-primary)",
              fontFamily: "VCRMono",
              fontWeight: 200,
              marginBottom: 15,
            }}
          >
            MaykShop
          </h2>
          <p
            style={{
              fontSize: "var(--fs-md)",
              color: "var(--text-primary)",
              textAlign: "justify",
            }}
          >
            A MaykShop é uma empresa especializada em segmentação comercial,
            criada para conectar entusiastas e amadores das áreas de tecnologia
            e games.
          </p>
          <Separator />
        </div>
      </section>

      <section className="w-full mx-auto px-4 py-8 text-center">
        <h2
          className="text-4xl"
          style={{
            color: "var(--text-primary)",
            fontFamily: "VCRMono",
            fontWeight: 200,
          }}
        >
          Produtos Novos e Lançamentos
        </h2>
        {/* Lucas: Fix - Em telas médias, como tablet (teste simulando o ipad ipadOS 14.7.1 no firefox), não estava centralizando os itens corretamente*/}
        {/* <div className="flex flex-col w-full justify-center items-center mx-auto px-10 py-4 text-center md:grid md:grid-cols-2 lg:grid-cols-3 space-y-5 md:gap-5"> */}
        <div className="
          w-full 
          mx-auto 
          px-10 
          py-4 
          text-center 
          flex flex-col justify-center items-center
          space-y-5
          md:grid md:grid-cols-3 md:gap-5 md:justify-items-center md:space-y-0
          lg:grid-cols-3
        ">
          {Producs.map((p) => (
            <Cards
              produto={p}
              key={p.id}
              onComprar={(produto) => setProdutoSelecionado(produto)}
            />
          ))}
          </div>
        <Separator />
      </section>

      {/* Lucas: Adicionar Carousel na página */}
       <section className="w-full max-w-[1200px] mx-auto px-4 py-8">
        <h2 className="text-4xl text-center mb-6" style={{
          color: "var(--text-primary)",
          fontFamily: "VCRMono",
          fontWeight: 200,
        }}>
          Explore mais jogos
        </h2>

        <VerticalCarousel>
          {games.map((p, idx) => (
            <Cards
              key={idx}
              produto={p}
              onComprar={(produto) => setProdutoSelecionado(produto)}
            />
          ))}
        </VerticalCarousel>

        <Separator />
      </section>
     
      <section>
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h2
            className="text-3xl"
            style={{
              color: "var(--text-primary)",
              fontFamily: "VCRMono",
              fontWeight: 200,
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            Perguntas Frequentes
          </h2>
          <Faq
            question="QUEM SOMOS"
            response="A MaykShop é uma empresa especializada em segmentação comercial, que reúne entusiastas e amadores da tecnologia e dos games"
          />
          <Separator />
        </div>
      </section>

      <section>
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h2
            className="text-3xl mb-6"
            style={{
              color: "var(--text-primary)",
              fontFamily: "VCRMono",
              fontWeight: 200,
              textAlign: "center",
            }}
          >
            Entre em Contato com a MaykShop
          </h2>
          <Email />
        </div>
      </section>

      <VendaModal produto={produtoSelecionado} onClose={() => setProdutoSelecionado(null)} />
    </ContainerFull>
  );
}
