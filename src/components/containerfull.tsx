// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HtmlHTMLAttributes } from "react";

interface ContainerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  props?: HtmlHTMLAttributes<HTMLDivElement>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,     
    },
  },
});

export function ContainerFull({ children, props }: ContainerProps) {
  return (
    <QueryClientProvider client={queryClient}>
      
      <main {...props}  
      className="flex-grow pb-20 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto
          bg-[#e5e5f2] dark:bg-[#121212]   // Lucas: modo escuro ativado
          text-neutral-900 dark:text-neutral-100 // Lucas: texto ajustado para tema claro/escuro"
      >
        {/* Lucas: Conteúdo do main com tema responsivo */}
        {children}
      </main>
    </QueryClientProvider>

  );
}



