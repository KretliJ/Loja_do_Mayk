// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

"use client";
import { useState, useEffect, useCallback } from "react";



import { throttle } from "lodash-es";
import { ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./buttonTheme";


interface NavProps {
  cartCount: number;
  onComprar: () => void
  score: number,
}

const Logo = "logo.png"


const Navigation = ({ cartCount, onComprar}: NavProps) => {

  const handleClick = () => {
    if (cartCount > 0) {
      onComprar();
    } else {
      alert("Nenhum produto selecionado.");
    }
  };

  return (
    <div className="flex items-center gap-6">


      <div className="relative">
        <button
          className=" w-10 h-10 flex items-center justify-center  p-2 rounded-full bg-gray-800 text-yellow-400 hover:bg-gray-700 transition"
          disabled={cartCount === 0}
          aria-label="Carrinho de compras"
          title="Carrinho de compras"
          onMouseDown={(e) => e.preventDefault()} // Previne o foco no botão  
          onClick={handleClick}
        >
          <ShoppingCart className="text-yellow-400" />
        </button>

        { cartCount > 0 &&(
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </div>

    </div>
  );
};

export default Navigation;



export function Header({  cartCount, onComprar, score}: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollNav, setShowScrollNav] = useState(false);



  // Lucas: Add funções para controlar dark mode
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  
  }, []);

  const handleScroll = useCallback(
    throttle(() => {
      setShowScrollNav(window.scrollY > 60);
    }, 200),
    []
  );

  useEffect(() => {
    // Função para fechar o menu ao redimensionar para dispositivos maiores
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // Fecha o menu ao redimensionar para desktop
      }
    };

    // Adiciona o ouvinte de evento de rolagem
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize); // Adiciona o listener de resize

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize); // Remove o listener de resize
    };
  }, [handleScroll]);

  if (!mounted) return null;

  // Lucas: Add dark mode buttom
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-3 bg-black">
      <div className="flex justify-between items-center w-full">

        {/* Logo na esquerda */}
        <a href="/" className="flex items-center space-x-2 rounded-md px-2 max-h-8 p-2">
          <img src={Logo} alt="MaykShop logo" width={340} height={80} className="md:max-w-[340px] max-h-20 object-contain py-2" aria-label="MaykShop" title="MaykShop"/>
        </a>
      

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          
          <ThemeToggle/>
          <nav className="flex space-x-6 text-gray-400">
            <Navigation cartCount={cartCount} onComprar={onComprar} score={score}/>
          </nav>
          <div className="text-white text-xs rounded-full flex flex-col items-center " aria-label="Score" title="Score">
            <div className="text-[10px] text-center ">SCORE:</div>
            <div className="text-yellow-400 text-xs text-center font-bold">{score}</div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-4">
         
          <ThemeToggle/>
            
          <Navigation cartCount={cartCount} onComprar={onComprar} score={score}/>
          <div className="text-white text-xs rounded-full flex flex-col items-center " aria-label="Score" title="Score">
            <div className="text-[10px] text-center ">SCORE:</div>
            <div className="text-yellow-400 text-xs text-center font-bold">{score}</div>
          </div>
        </div>
      </div>

  
    </header>
  );
}