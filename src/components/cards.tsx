// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.



import { Produto } from "../types/types";
import { AddButton } from "./addButton";

interface ProductCardProps {
  produto: Produto
  onComprar: (produto: Produto) => void

  onVeiw: (produto: Produto) => void


  cartCount?: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;

}


export function Cards({ produto, onComprar, setCartCount, onVeiw}: ProductCardProps) {


  // adicionar item ao carrinho e fechar modal
  const handleAddToCart = () => {
    setCartCount(1);
    
    onComprar(produto); // chama a função de compra com o produto atual
    // aqui você fecharia o modal
  };

  return (
    <div className={`"flex flex-col p-2 gap-2 items-start light:text-txlight dark:text-txDark border border-gray-300 md:max-w-80 rounded-md px-2 min-h-[370px] w-[230px] max-h-[370px]shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 ease-in-out light:bg-background dark:bg-dark space-y-16 opacity-95 ${produto.Stock < 1 ? "opacity-30" : ""
      }"`} aria-label={produto.title} title={produto.title}>


      {produto.Iimage && (
        <div className="w-full h-28 flex items-center justify-center rounded mb-2 mt-0">
          <img
            src={produto.Iimage}
            alt={produto.title}
            width={120}
            height={120}
            className="max-w-full max-h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      )}

      <p className="flex flex-col md:text-lg text-md font-normal light:text-txlight dark:text-txDark  break-words max-h-20 mx-auto w-full text-center font-sans ">
        <span className="flex items-center justify-center"><span className="md:text-lg text-md font-bold flex items-center justify-center gap-2 text-center mb-2 font-sans ">{produto.title}</span></span>
        {produto.description}
      </p>
      <div className="flex justify- items-center w-full mb-0 mt-5 flex-col gap-2">
        <button onClick={() => onVeiw(produto)} className="  bg-green-500 hover:bg-green-800 ttext-lg font-sans font-semibold light:text-txlight dark:text-txDark shadow cursor-pointer transition-colors duration-200 h-10 m text-center px-4 rounded w-52 disabled:opacity-50 mt-3 mx-auto" aria-label="Ver Detalhes" title="Ver Detalhes">
          Ver Detalhes
        </button>
        <AddButton handleAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}

