// components/VendaModal.tsx
import { Produto } from '../types/types'
import { AddButton } from './addButton';
import { Loading } from './loading';
import CommentSection from './commentSection';



interface Props {
  produto: Produto | null;
  onClose: () => void
  cartCount?: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  onComprar: (produto: Produto) => void;
}

export function Modal({ produto, onClose, setCartCount, onComprar, cartCount}: Props) {
  
  if (!produto) return (
    <div
      className="fixed inset-0 top-10 bg-black/30 flex justify-center items-start pt-12 light:text-txlight dark:text-txDark"
      onClick={onClose} // Clique fora fecha
    >
      <div
        className="w-full max-w-2xl light:bg-background dark:bg-dark py-6 px-10 h-[500px]  flex flex-col items-center rounded-lg border-gray-700 border-2 text-black -mt-6 md:-mt-5"
        onClick={(e) => e.stopPropagation()} // Clique dentro não fecha
      >

        <div className="w-full py-24 max-h[500px] h-[500px] border border-gray-400 rounded-md p-8 mb-1 flex justify-center  flex-col space-y-3">
          <Loading />
          <h2 className="text-xl font-bold text-center light:text-txlight font-sans dark:text-txDark">Carregando...</h2>
          <p className="light:text-txlight dark:text-txDark flex font-sans flex-col md:text-lg text-base font-medium break-words max-h-20 mx-auto w-full text-center">
            Aguarde enquanto os detalhes do produto são carregados.
          </p>
    
        </div>
        <div className="flex justify- items-center w-full mb-0 mt-5 flex-col gap-2">

          
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-800 font-sans light:text-txlight dark:text-txDark px-4 rounded w-52 disabled:opacity-50 mt-3 mx-auto text-lg font-semibold"
            aria-label="Voltar" title="Voltar"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
  

  // adicionar item ao carrinho e fechar modal
  const handleAddToCart = () => {
    setCartCount(1);
    onClose(); // fecha o modal
    onComprar(produto); // chama a função de compra com o produto atual
    // aqui você fecharia o modal
  };

  return (
    // Lucas: Modal fecha ao clicar fora
    <div
      className="fixed inset-0 top-10 font-sans  z-50 bg-black/30 flex justify-center items-start pt-12 light:text-txlight dark:text-txDark px-4"
      onClick={onClose} // Clique fora fecha
    >
      <div
        className="w-full max-w-2xl light:bg-background dark:bg-dark py-6 px-6 h-[500px] flex flex-col items-center rounded-lg border-gray-700 border-2 text-black -mt-6 md:-mt-5 overflow-y-scroll"
        onClick={(e) => e.stopPropagation()} // Clique dentro não fecha
      >

        <div className="w-full py-28 max-w-full h-[800px] max-h-full  border border-gray-400 rounded-md px-4 mb-1 flex justify-center flex-col space-y-6">
          <img
            src={produto.Iimage}
            alt={produto.title}
            className="object-contain h-full w-full max-w-full max-h-full rounded-xl"
          />
          <h2 className="text-xl font-bold text-center font-sans light:text-txlight dark:text-txDark">{produto.title}</h2>
          <p className="light:text-txlight dark:text-txDark font-sans flex flex-col md:text-lg text-base font-medium break-words max-h-20 mx-auto w-full text-center">
            {produto.description}
          </p>
          <div className="flex justify-between items-center gap-2 mb-4 mt-2">
            <p className="md:text-lg text-md  font-sans font-semibold text-center light:text-white  dark:text-txDark bg-green-600 max-w-64 max-h-[42px] h-[42px] rounded px-4 mx-auto flex items-center">
              {produto.Stock} unidades disponíveis.
          </p>
          <p className="md:text-lg text-md font-sans font-semibold text-center light:text-white dark:text-txDark bg-green-600 max-w-64 max-h-[42px] h-[42px] rounded px-4 mx-auto flex items-center">
            R${produto.price.toFixed(2)}
          </p>
          </div>
    
        </div>
        <div className="flex justify- items-center w-full mt-5 flex-col gap-2 mb-8 shadow-xl py-4">

          <AddButton handleAddToCart={handleAddToCart} />
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-800 font-sans light:text-txlight dark:text-txDark px-4 rounded w-52 disabled:opacity-50 mt-3 mx-auto text-lg font-semibold"
            aria-label="Voltar" title="Voltar"
          >
            Voltar
          </button>
        </div>
        <CommentSection />
      </div>
    </div>
  );
}
