// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import { Email } from "@/components/email";


import { Faq } from "@/components/faq";
import { Separator } from "@/components/separator";

import { Cards } from "../components/cards";
import { VendaModal } from "@/components/vendaModal";

import { Produto } from "@/types/types";


import { VerticalCarousel } from "@/components/VerticalCarousel";
import { Modal } from "./modal";
import { useCarouselProducts, useProducts } from "@/lib/api/Products";
import { getGames } from "@/lib/api/games";

interface ContainerProps {
  produtoDetalhes: Produto | null;
  produtoCarrinho: Produto | null;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  onComprar: (produto: Produto) => void;
  onVeiw: (produto: Produto) => void;
  onClose: () => void;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function ContainerFull({setCartCount, onClose, onComprar, onVeiw, produtoCarrinho, produtoDetalhes}: ContainerProps) {

  
  const games: Produto[] = getGames();
  const producs: Produto[] = useProducts();



  return (
    <QueryClientProvider client={queryClient}>
      <main
        className="relative flex-grow max-w-[1200px] text-white mx-auto z-10 mt-24"
      >
        <section>
          <div className="max-w-3xl mx-auto px-4 py-8 text-center">
            <h2
              className="text-4xl"
              style={{
                color: "var(--text-main)",
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
                color: "var(--text-main)",
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
              color: "var(--text-main)",
              fontFamily: "VCRMono",
              fontWeight: 200,
            }}
          >
            Produtos Novos e Lançamentos
          </h2>

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
            {producs.map((p) => (
              <Cards
                setCartCount={setCartCount}
                produto={p}
                key={p.id}
                onComprar={onComprar}
                onVeiw={onVeiw}
              />
            ))}
          </div>
          <Separator />
        </section>

        {/* Lucas: Adicionar Carousel na página */}
        <section className="w-full max-w-[1200px] mx-auto px-4 py-8">
          <h2 className="text-4xl text-center mb-6" style={{
            color: "var(--text-main)",
            fontFamily: "VCRMono",
            fontWeight: 200,
          }}>
            Explore mais jogos
          </h2>

          <VerticalCarousel>
            {games.map((p, idx) => (
              <Cards
                setCartCount={setCartCount}
                key={p.id}
                produto={p}
                onComprar={onComprar}
                onVeiw={onVeiw}
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
                color: "var(--text-main)",
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

      
        <section className="w-full max-w-[1200px] mx-auto px-4 py-8">
          <h2 className="text-4xl text-center mb-6" style={{
            color: "var(--text-main)",
            fontFamily: "VCRMono",
            fontWeight: 200,
          }}>
            Fale Conosco
          </h2>

            <Email/>

          <Separator />
        </section>
        
        {produtoDetalhes && (
          <Modal
            produto={produtoDetalhes}
            onClose={onClose}
            setCartCount={setCartCount}
            onComprar={onComprar}
          />
        )}

        {produtoCarrinho && (
          <VendaModal produto={produtoCarrinho} onClose={onClose} />
        )}

      </main>
    </QueryClientProvider>

  );
}