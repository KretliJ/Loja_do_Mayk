'use client'

import { useEffect, useState } from "react";
import { ContainerFull } from "./components/containerfull";
import { Produto } from "./types/types";
import { Header } from "./components/header";
import { seedProducts } from "./lib/seed";






export function App() {
  console.log("App montado");
  
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<Produto[]>([]);

  const [modalDetalhes, setModalDetalhes] = useState<Produto | null>(null);
  const [modalCarrinho, setModalCarrinho] = useState<Produto | null>(null);

  const [isZeldaModalOpen, setIsZeldaModalOpen] = useState(false);

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    seedProducts(); // Preenche o localStorage se necessário
    
  }, []);

  const handleAdicionarAoCarrinho = (produto: Produto) => {
    setCartItems((prev) => [...prev, produto]);
    setCartCount(1);
    setScore((i) => (i + produto.price))
    setModalCarrinho(produto); // abre o modal do carrinho
  };

  const handleVerDetalhes = (produto: Produto) => {
    setModalDetalhes(produto);
  };

  const handleAbrirCarrinho = () => {
    const ultimo = cartItems[cartItems.length - 1];
    if (ultimo) setModalCarrinho(ultimo);
  };

  const fecharModais = () => {
    setModalCarrinho(null);
    setModalDetalhes(null);
  };

 // Substitua seu 'return' por este bloco completo

  return (
    <>
      <Header
        score={score}
        cartCount={cartCount}
        onComprar={handleAbrirCarrinho}
      />

      <ContainerFull
      
        setCartCount={setCartCount}
        onComprar={handleAdicionarAoCarrinho}
        onVeiw={handleVerDetalhes}
        produtoDetalhes={modalDetalhes}
        produtoCarrinho={modalCarrinho}
        onClose={fecharModais}
        isZeldaModalOpen={isZeldaModalOpen}
        setIsZeldaModalOpen={setIsZeldaModalOpen}
      />

  
    </>
  );
}
