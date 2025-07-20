"use client";

import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Send, ChevronLeft, ChevronRight } from "lucide-react";
=======
import { Send } from "lucide-react";
>>>>>>> 32d7725 (feat: Comentários Globais com Estado Salvo no servidor)

interface Comment {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

<<<<<<< HEAD
interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function GlobalComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/comments?page=${page}`);
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Erro ao carregar comentários", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(1);
=======
export default function GlobalCommnets() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then(setComments)
      .catch((err) => console.error("Erro ao carregar comentários", err));
>>>>>>> 32d7725 (feat: Comentários Globais com Estado Salvo no servidor)
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
<<<<<<< HEAD
      fetchComments(1);
=======
>>>>>>> 32d7725 (feat: Comentários Globais com Estado Salvo no servidor)
      setName("");
      setMessage("");
    } else {
      alert("Erro ao enviar comentário");
    }
  };

<<<<<<< HEAD
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchComments(newPage);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 shadow-lg rounded-2xl bg-background dark:bg-dark">
      <h2 className="text-2xl font-bold mb-4 text-txlight dark:text-txDark text-center font-sans">
        Comentários ({pagination.totalItems})
      </h2>
=======
  return (
    <div className="w-full mx-auto p-4 shadow-lg rounded-2xl bg-background dark:bg-dark">
      <h2 className="text-2xl font-bold mb-4 light:text-txlight dark:text-txDark font-sans text-center">Comentários</h2>
>>>>>>> 32d7725 (feat: Comentários Globais com Estado Salvo no servidor)

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
<<<<<<< HEAD
          className="w-full p-2 mb-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
=======
          className="w-full p-2 mb-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-background dark:bg-dark light:text-txlight dark:text-txDark"
>>>>>>> 32d7725 (feat: Comentários Globais com Estado Salvo no servidor)
        />
        <textarea
          placeholder="Escreva um comentário..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
<<<<<<< HEAD
          className="w-full p-2 mb-2 rounded-lg resize-none border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition"
=======
          className="w-full p-2 mb-2 rounded-lg resize-none border border-zinc-300 dark:border-zinc-700 bg-background dark:bg-dark light:text-txlight dark:text-txDark"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-800 transition"
>>>>>>> 32d7725 (feat: Comentários Globais com Estado Salvo no servidor)
        >
          <Send size={16} /> Enviar
        </button>
      </form>

<<<<<<< HEAD
      {isLoading ? (
        <div className="text-center py-3 text-zinc-500 dark:text-zinc-400 text-sm">Carregando...</div>
        ) : (
        <>
            <div className="space-y-2 mb-3">
            {comments.length === 0 ? (
                <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm">
                Nenhum comentário ainda.
                </p>
            ) : (
                comments.map((comment) => (
                <div 
                    key={comment.id} 
                    className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-900"
                >
                    <div className="flex justify-between items-center text-[11px] text-zinc-500 dark:text-zinc-400 mb-0.5">
                    <span className="font-medium">{comment.name}</span>
                    <span>{comment.createdAt}</span>
                    </div>
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 text-[10px] leading-snug break-words">
                    {comment.message}
                    </p>
                </div>
                ))
            )}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-full disabled:opacity-50 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
              >
                <ChevronLeft size={20} />
              </button>

              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                Página {pagination.currentPage} de {pagination.totalPages}
              </span>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 rounded-full disabled:opacity-50 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
=======
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
>>>>>>> 32d7725 (feat: Comentários Globais com Estado Salvo no servidor)
