"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

export default function GlobalCommnets() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then(setComments)
      .catch((err) => console.error("Erro ao carregar comentários", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    if (res.ok) {
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setName("");
      setMessage("");
    } else {
      alert("Erro ao enviar comentário");
    }
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
          <p className="light:text-txlight dark:text-txDark text-center font-sans">Nenhum comentário ainda.</p>
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