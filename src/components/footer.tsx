// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

import { Instagram, Linkedin } from "lucide-react";


export function Footer() {
  return (
    <footer className="flex flex-col space-y-3 space-x-3 bg-black text-white py-4 text-center my-0  w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto z-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        <div className="flex flex-col space-y-4 md:items-start items-center border-b border-gray-300 p-2">
          <h2
            className="md:text-2xl text-lg font-normal text-white text-center font-mono"
            
          >
            MaykShop.
          </h2>
          {/* <p className="text-base font-algorithms-font font-bold text-white text-center">Telefone: (00) 00000-0000</p> */}
          <p
            className="text- font-bold text-white text-center font-sans"
            
          >
            E-mail: contatoMaykshop@gmail.com
          </p>
          <p
            className="text-sm font-algorithms-font font-bold text-white text-center font-sans"
            
          >
      
            Localização: Rua Trinta e Seis 115 - UFOP-ICEA Cruzeiro Celeste
          </p>
        </div>
        <div className="flex flex-col space-y-4 items-center">

          <div className="flex space-x-8 items-center justify-center">
            <a href="https://www.instagram.com/p/CsB3sAeusrk/?img_index=1" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/company/visaojr/?originalSubdomain=br" target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <p className="text-center font-mono font-normal text-white/45 text-base">
        Copyright &copy; 2025 MaykShop.
      </p>
    </footer>
  );
}
