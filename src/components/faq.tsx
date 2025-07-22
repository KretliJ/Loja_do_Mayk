// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

interface FaqProps {
  question: string;
  response: string;
}

export function Faq({ question, response }: FaqProps) {
  // Lucas: Adicionar Esquema de Global
  return (
    <div className={`flex flex-col items-center justify-center gap-4 mx-auto border-l-2 border-l-[#000099] px-3`}>
      <li
        className={` list-none text-start w-full text-white mt-4 md:text-xl text-lg mx-auto font-normal`} 
       
      >
        {question}
      </li>
      <p className="text-start text-lg text-gray-300 mt-4 md:text-xl font-sans "
       
      >
        {response}
      </p>
    </div>
  );
}
