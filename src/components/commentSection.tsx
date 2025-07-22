
import { useState } from "react";
import { Send } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
     {
    id: 1,
    name: "Pedro",
    message: "Esse artigo está excelente!",
    createdAt: "17/07/2025 14:23",
  },
  {
    id: 2,
    name: "DuDU",
    message: "Melhor jogo da atualidade. Obrigado!",
    createdAt: "17/07/2025 15:02",
  },
  {
    id: 3,
    name: "Alice",
    message: "Que lançamento incrível!.",
    createdAt: "17/07/2025 15:30",
  },
  ]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name,
      message,
      createdAt: new Date().toLocaleString("pt-BR"),
    };

    setComments([newComment, ...comments]);
    setName("");
    setMessage("");
  };

  return (
    <div className="w-full mx-auto p-4 shadow-lg rounded-2xl bg-background dark:bg-dark">
      <h2 className="text-2xl font-bold mb-4 light:text-txlight dark:text-txDark font-sans text-center">Comentários</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-background dark:bg-dark light:text-txlight dark:text-txDark"
        />
        <textarea
          placeholder="Escreva um comentário..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mb-2 rounded-lg resize-none border border-zinc-300 dark:border-zinc-700 bg-background dark:bg-dark light:text-txlight dark:text-txDark"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-800 transition"
        >
          <Send size={16} /> Enviar
        </button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="light:text-txlight dark:text-txDark text-center font-sans ">Nenhum comentário ainda.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-background dark:bg-dark p-3 rounded-lg font-sans">
              <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400 font-sans">
                <span>{comment.name}</span>
                <span>{comment.createdAt}</span>
              </div>
              <p className="mt-1 text-zinc-800 dark:text-zinc-100 font-sans">{comment.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
// This component provides a simple comment section where users can submit their name and message.
// It maintains a list of comments in the local state and displays them below the form.
// The comments are displayed with the name of the commenter and the time they were created. 