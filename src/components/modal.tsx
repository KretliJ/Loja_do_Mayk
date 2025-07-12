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

export function Modal({ produto, onClose, setCartCount, onComprar, cartCount }: Props) {
  if (!produto) return null;

  const handleAddToCart = () => {
    setCartCount(1);
    onClose();
    onComprar(produto);
  };

  return (
    <div
      className="fixed inset-0 top-10 bg-black/30 flex justify-center items-start pt-12 z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[var(--container-bg)] text-[var(--container-text)] py-6 px-10 h-[600px] overflow-y-auto 
                   flex flex-col items-center rounded-lg border-[var(--container-border)] border-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full py-20 h-[500px] border border-[var(--input-border)] rounded-md p-8 shadow-2xl mb-1 
                        flex justify-center overflow-hidden flex-col space-y-3">
          <img
            src={produto.Iimage}
            alt={produto.title}
            className="object-contain h-full w-full max-w-full max-h-full rounded-xl"
          />

          <h2 className="text-xl font-bold text-center text-[var(--text-primary)]">{produto.title}</h2>

          <p className="text-[var(--text-muted)] flex flex-col md:text-lg text-base font-medium break-words 
                        max-h-20 mx-auto w-full text-center">
            {produto.description}
          </p>

          <p className="text-lg font-semibold text-center text-[var(--button-text-default)] 
                        bg-[var(--color-success)] max-w-32 rounded-2xl px-2 mx-auto">
            R$ {produto.price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center w-full mt-5 flex-col gap-2">
          <button
            onClick={onClose}
            className="bg-[var(--color-error)] hover:bg-[var(--color-error-dark)] 
                       text-[var(--button-text-default)] px-4 py-2 rounded w-60 disabled:opacity-50 mt-3 mx-auto"
          >
            Voltar
          </button>

          <AddButton handleAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}
