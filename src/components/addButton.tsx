interface Props {
  handleAddToCart: () => void;
}
export function AddButton({handleAddToCart}:Props) {
  
  return (
    <button
        onClick={handleAddToCart}
        className="bg-yellow-500 font-sans hover:bg-yellow-800 text-lg font-semibold light:text-txlight dark:text-txDark shadow cursor-pointer transition-colors duration-200 h-10 m text-center px-4 rounded w-52 disabled:opacity-50 mt-3 mx-auto"
        aria-label="Adicionar item" title="Adicionar item"
      >
        Adicionar item
      </button>
  );
}

