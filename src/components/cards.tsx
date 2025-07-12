// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

import Image from "next/image";


import { Produto } from "@/types/types";
import { AddButton } from "./addButton";

interface ProductCardProps {
  produto: Produto
  onComprar: (produto: Produto) => void

  onVeiw: (produto: Produto) => void


  cartCount?: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;

}


// Lucas update component theme
export function Cards({ produto, onComprar, setCartCount, onVeiw }: ProductCardProps) {
  // Adicionar ao carrinho
  const handleAddToCart = () => {
    setCartCount(1);
    onComprar(produto); // Aqui deve-se fechar o modal
  };

  return (
    <div
      className={`flex flex-col justify-between h-full p-2 gap-2 
        text-[var(--container-text)] border border-[var(--container-border)] 
        md:max-w-80 rounded-md px-2 min-h-[370px] w-[230px] max-h-[370px] 
        shadow-lg hover:shadow-xl hover:scale-105 transition-all 
        duration-300 ease-in-out bg-[var(--container-bg)] 
        opacity-95 ${produto.Stock < 1 ? "opacity-30" : ""}
      `}
    >
      {produto.Iimage && (
        <div className="w-full h-28 flex items-center justify-center rounded mb-2 mt-0">
          <Image
            src={produto.Iimage}
            alt={produto.title}
            width={120}
            height={120}
            className="max-w-full max-h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      )}

      <p
        className="flex flex-col text-[var(--text-secondary)] text-base font-medium break-words max-h-20 mx-auto w-full text-center"
      >
        <span className="flex items-center justify-center">
          <span className="md:text-lg text-base font-bold text-[var(--text-secondary)] flex items-center justify-center gap-2 text-center">
            {produto.title}
          </span>
        </span>
        {produto.description}
      </p>

      {/* Ver Detalhes */}
      <div className="flex items-center w-full mb-0 mt-5 flex-col gap-2">
        <button
          onClick={() => onVeiw(produto)}
          className="w-48 h-10 rounded-xl mx-auto text-center cursor-pointer 
                     bg-[var(--color-success)] text-[var(--container-bg)] 
                     border border-[var(--color-success-dark)] hover:bg-[var(--color-success-dark)] 
                     transition-all duration-200"
        >
          Ver Detalhes
        </button>

        <AddButton handleAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}
