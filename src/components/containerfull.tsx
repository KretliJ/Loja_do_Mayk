// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.
import { Press_Start_2P } from 'next/font/google'

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-press-start',
})

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Faq } from "@/components/faq";
import { Separator } from "@/components/separator";

import { Cards } from "../components/cards";
import { VendaModal } from "@/components/vendaModal";

import { Produto } from "@/types/types";

import { Modal } from "./modal";
import { useCarouselProducts, useProducts } from "@/lib/api/Products";
import ImagemCarrossel from '@/components/ImagemCarrossel';
import Mapa from './mapView';
import { Carousel } from '@/components/Carousel';
import { EmailForm } from '@/components/EmailForm';
import CommentSection from './commentSection';




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

export function ContainerFull({ setCartCount, onClose, onComprar, onVeiw, produtoCarrinho, produtoDetalhes }: ContainerProps) {


  const games: Produto[] = useCarouselProducts();
  const producs: Produto[] = useProducts();
  const postId = "maykshop-pagina-principal";
  const postTitle = "Comentários sobre a MaykShop";



  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={`relative flex-grow md:max-w-[1200px] text-white md:mx-auto bg-transparent z-10 mt-24 w-full ${pressStart.variable}`}
      >
        <section className="w-full mx-auto px-4 py-8 text-center">
          <div className="max-w-3xl mx-auto px-4 py-8 text-center">
            <h2
              className="md:text-2xl text-white font-normal text-lg mb-4"

            >
              MaykShop
            </h2>
            <p
              className="text-lg text-gray-300 mt-4 md:text-xl text-start font-sans "

            >
              A MaykShop é uma empresa especializada em segmentação comercial,
              criada para conectar entusiastas e amadores das áreas de tecnologia
              e games.
            </p>
            <Separator />
          </div>
        </section>

        <section className="w-full mx-auto px-4 py-8 text-center">
          <h2 className="md:text-2xl text-white font-normal text-lg md:mb-4">DESTAQUES</h2>
          <ImagemCarrossel />
        </section>

         {/*Lucas: Adicionar Carrosel de Jogos */}
        <section className="w-full mx-auto px-4 py-8 text-center">
          <h2
            className="md:text-2xl text-white font-normal text-lg mb-4"

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

        <section className="w-full mx-auto px-4 py-8 text-center">
          <h2 className="md:text-2xl text-white font-normal text-lg mb-4">
            Explore mais jogos
          </h2>

          <div className="w-full">
            {games.length > 0 ? (
              <Carousel
                produtos={games}
                onComprar={onComprar}
                onVeiw={onVeiw}
                setCartCount={setCartCount}
              />
            ) : (
              <p className="text-white opacity-60">Nenhum jogo encontrado.</p>
            )}
          </div>

          <Separator />
        </section>

        <section className="w-full mx-auto px-4 py-8 text-center">
          <div className="max-w-3xl mx-auto px-4 py-8 text-center">
            <h2
              className="md:text-2xl text-white font-normal text-lg mb-4"

            >
              Perguntas Frequentes
            </h2>
            <Faq
              question="QUEM SOMOS ?"
              response="A MaykShop é uma empresa especializada em segmentação comercial, que reúne entusiastas e amadores da tecnologia e dos games"
            />
           
          </div>
            {/*Lucas: Adicionar Formulário de Contato*/}
            <EmailForm />
            <Separator />
        </section>

        <section className="w-full mx-auto px-4 py-8 text-center">

          <div className="p-8 max-w-xl mx-auto">
            <h1 className="md:text-2xl text-white font-normal text-lg mb-4">Onde estamos</h1>
            <p className="text-white-600 mb-4 font-sans">Confira no mapa nossa localização exata:</p>
            <Mapa />
          </div>
        </section>

       {/*Lucas: Adicionar Seção de Comentários */}
      <section className="w-full mx-auto px-4 py-8 text-center">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">{postTitle}</h1>
          <p>Conteúdo do post aqui...</p>

          <hr className="my-8" />

          <CommentSection/>

        </div>
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