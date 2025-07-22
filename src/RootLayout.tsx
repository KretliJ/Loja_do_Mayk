import React from "react";
import { ThemeProvider } from "./context/theme-context";
import { Footer } from "./components/footer";
import "./globals.css";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="antialiased overflow-y-auto min-h-screen flex flex-col
                 bg-[url('/back3.png')] bg-cover bg-center h-screen w-full
                 bg-no-repeat bg-fixed"
      style={{
        fontFamily: "var(--font-Roboto), var(--font-Montserrat), sans-serif",
      }}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-none z-0 m-0"></div>

      <ThemeProvider>
        {children}
        <Footer />
      </ThemeProvider>
    </div>
  );
}
