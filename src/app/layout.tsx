// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";


const roboto = Roboto({
  variable: "--font-Roboto",
  subsets: ["latin"],
  weight: "400"
})

const montserrat = Montserrat({
  variable: "--font-Montserrat",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {

  title: {
    default: "MaykeShop ",
    template: "%s | MaykeShop",
  },


};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      

      <body
    
        className={`${roboto.variable} ${montserrat.variable} antialiased overflow-y-auto min-h-screen flex flex-col bg-[url('/back3.png')] bg-cover bg-center h-screen w-full bg-no-repeat bg-fixed `}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-none z-0 m-0"></div>

        <ThemeProvider>

          {children}
        </ThemeProvider>


      </body>
    </html>
  );
}