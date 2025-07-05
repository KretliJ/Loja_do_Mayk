// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../public/logo.png"

import { throttle } from "lodash";

interface HeaderProps {
  children?: React.ReactNode;
}

const Navigation = () => (
  <>
    <Link href="/" className="hover:text-white hadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-75 ease-in-out">Inicio</Link>
    <Link href="/contatos" className="hover:text-white hadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-75 ease-in-out">Contatos</Link>
  </>
);

type ThemeMode = "auto" | "light" | "dark";

export function Header({ children }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollNav, setShowScrollNav] = useState(false);

  // Lucas: Add funções para controlar dark mode
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("auto");
  const themeIcon = theme === "auto" ? "🖥️" : theme === "dark" ? "🌙" : "☀️";
  const themeLabel = theme === "auto" ? "Seguir sistema" : theme === "dark" ? "Modo escuro" : "Modo claro";

  // Aplicar tema no DOM
  const applyTheme = (mode: ThemeMode) => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");

    if (mode === "dark") {
      html.classList.add("dark");
    } else if (mode === "light") {
      html.classList.add("light");
    } else {
      // Auto: aplica com base no sistema
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.classList.add(prefersDark ? "dark" : "light");
    }

    localStorage.setItem("theme", mode);
  };

  // Alterna entre os temas: auto | dark | light
  const toggleTheme = () => {
    const next = theme === "auto" ? "dark" : theme === "dark" ? "light" : "auto";
    setTheme(next);
    applyTheme(next);
  };

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as ThemeMode | null;

    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      applyTheme(stored);
    } else {
      setTheme("auto");
      applyTheme("auto");
    }
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
        <Link href="/" className="flex items-center space-x-2 rounded-md px-2 max-h-8 p-2">
          <Image src={Logo} alt="MaykShop logo" width={340} height={80} className="md:max-w-[340px] max-h-20 object-contain py-2" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Botão tema no desktop */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-900 text-yellow-400 hover:bg-gray-600 transition-colors"
            aria-label={themeLabel}
            title={themeLabel}
          >
            {themeIcon}
          </button>
          {/* Navegação */}
          <nav className="flex space-x-6 text-gray-400">
            <Navigation />
          </nav>
        </div>
        
        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Botão tema no mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-700 text-yellow-400 hover:bg-gray-600 transition-colors"
            aria-label={themeLabel}
            title={themeLabel}
          >
            {themeIcon}
          </button>

          {/* Botão hambúrguer no mobile */}
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menu mobile aberto */}
      {menuOpen && (
        <nav className="mt-5 mx-auto w-full bg-black text-gray-400 flex flex-col space-y-4 py-4 px-6 shadow-lg rounded-md md:hidden">
          <Navigation />
        </nav>
      )}
    </header>
  );
}
