// components/VendaModal.tsx
import { Produto } from '@/types/types'
import { AddButton } from './addButton';



interface Props {
  produto: Produto | null;
  onClose: () => void
  cartCount?: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  onComprar: (produto: Produto) => void;
}

export function Modal({ produto, onClose, setCartCount, onComprar, cartCount}: Props) {
  
  if (!produto) return null
  

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
      className="fixed inset-0 top-10 bg-black/30 flex justify-center items-start pt-12 light:text-txlight dark:text-txDark"
      onClick={onClose} // Clique fora fecha
    >
      <div
        className="w-full max-w-2xl light:bg-background dark:bg-dark py-6 px-10 h-[600px] overflow-y-auto flex flex-col items-center rounded-lg border-gray-700 border-2 shadow-2xl text-black"
        onClick={(e) => e.stopPropagation()} // Clique dentro não fecha
      >

        <div className="w-full py-20 max-h[500px] h-[500px] border border-gray-400 rounded-md p-8 shadow-2xl mb-1 flex justify-center overflow-hidden flex-col space-y-3">
          <img
            src={produto.Iimage}
            alt={produto.title}
            className="object-contain h-full w-full max-w-full max-h-full rounded-xl"
          />
          <h2 className="text-xl font-bold text-center light:text-txlight dark:text-txDark">{produto.title}</h2>
          <p className="light:text-txlight dark:text-txDark flex flex-col md:text-lg text-base font-medium break-words max-h-20 mx-auto w-full text-center">
            {produto.description}
          </p>
          <p className="text-lg font-semibold text-center light:text-txlight dark:text-txDark bg-green-600 max-w-32 rounded-2xl px-2 mx-auto">
            R$ {produto.price.toFixed(2)}
          </p>
        </div>
        <div className="flex justify- items-center w-full mb-0 mt-5 flex-col gap-2">

          <AddButton handleAddToCart={handleAddToCart} />
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-800 light:text-txlight dark:text-txDark px-4 rounded w-52 disabled:opacity-50 mt-3 mx-auto text-lg font-semibold"
            aria-label="Voltar" title="Voltar"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
