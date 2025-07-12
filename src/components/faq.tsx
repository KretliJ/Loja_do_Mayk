// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

interface FaqProps {
  question: string;
  response: string;
}

export function Faq({ question, response }: FaqProps) {
  // Lucas: Adicionar Esquema de Global
  return (
    <div className="flex flex-col items-center justify-center gap-4 mx-auto">
      <li
        className="list-none text-start w-full font-semibold"
        style={{
          fontSize: "var(--fs-xl)",
          color: "var(--text-main)",
          fontFamily: "VCRMono",
          fontWeight: 200,
        }}
      >
        {question}
      </li>
      <p
        style={{
          fontSize: "var(--fs-sm)",
          color: "var(--text-main)",
          fontFamily: "VCRMono",
          fontWeight: 200,
          textAlign: "justify",
        }}
      >
        {response}
      </p>
    </div>
  );
}
