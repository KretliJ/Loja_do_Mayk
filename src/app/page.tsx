// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

import { Metadata } from 'next';
import { Email } from "@/components/email";
import { ContainerFull } from "@/components/containerfull";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Faq } from '@/components/faq';
import { Separator } from '@/components/separator';

export const metadata: Metadata = {
  title: "MaykShop | Tecnologia e Games",
  description: "Tecnologia e Games.",
};

export default function Home() {
  return (
    <ContainerFull>
      <div className="flex flex-col items-center justify-center px-4 md:px-0 w-auto mx-auto md:max-w-[800px] gap-4 mt-5">
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <h2 className="md:text-4xl text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100">
            {/* Lucas: suporte a tema responsivo */}
            MaykShop
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-4">
          <p className="md:text-xl text-base font-algorithms-font text-center text-neutral-900 dark:text-neutral-100">
            {/* Lucas: suporte a tema responsivo */}
            A MaykShop é uma empresa especializada em segmentação comercial, criada para conectar entusiastas e amadores das áreas de tecnologia e games
          </p>
          <p className="md:text-xl text-base font-algorithms-font text-center text-neutral-900 dark:text-neutral-100">
            {/* Lucas: suporte a tema responsivo */}
            O objetivo principal é gerar impacto no mercado local e regional, conectando entusiastas e amadores de tecnologia e games
          </p>
        </div>

        <Separator />
      </div>

      <div className="text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-center px-4 md:px-0 w-auto mx-auto md:max-w-[800px] gap-4 mt-5 space-y-2">
        {/* Lucas: suporte a tema responsivo */}
        <h2 className='md:text-4xl text-2xl font-bold text-center underline mb-3'>
          Perguntas Frequentes
        </h2>
        <ul className='list-none space-y-4'>
          <Faq question='O QUEM SOMOS' response='A MaykeShop é uma empresa especializada em segmentação comercial, que reúne entusiastas e amadores da tecnologia e dos games' />
        </ul>
        <Separator />
      </div>

      <div className="flex flex-col items-center justify-center px-4 md:px-0 w-auto mx-auto md:max-w-[800px] gap-4 mt-8">
        <h2 className='md:text-4xl text-2xl font-bold text-center mb-3 text-neutral-900 dark:text-neutral-100'>
          {/* Lucas: suporte a tema responsivo */}
          Entre em Contato com a MaykShop
        </h2>
        <Email />
      </div>
    </ContainerFull>
  );
}
