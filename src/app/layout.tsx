// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "../../node_modules/sonner/dist/index";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";





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
    <html lang="pt-BR" className="bg-F-bg">
      
      <body
        className={`${roboto.variable} ${montserrat.variable} antialiased bg-[#e5e5f2] min-h-screen flex flex-col`}
      >
        <Header />

        {children}
  
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}



