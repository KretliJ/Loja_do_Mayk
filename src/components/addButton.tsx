import { useState } from "react";

interface Props {
  handleAddToCart: () => void;
}
export function AddButton({handleAddToCart}:Props) {
  
  return (
    <button
        onClick={handleAddToCart}
         className="px-3 py-1 rounded text-sm shadow cursor-pointer 
                 transition-colors duration-200 w-48 h-10 mx-auto text-center
                 border border-[var(--button-border)] 
                 bg-[var(--button-bg-default)] 
                 text-[var(--button-text-default)] 
                 hover:bg-[var(--button-bg-hover)] 
                 hover:text-[var(--button-text-hover)]"
      >
        Adicionar item
      </button>
  );
}