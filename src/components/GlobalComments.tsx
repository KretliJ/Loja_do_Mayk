// Lucas: Criar componente

import { useEffect, useState } from "react";
import { Send, ChevronLeft, ChevronRight } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

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
      fetchComments(1);
      setName("");
      setMessage("");
    } else {
      alert("Erro ao enviar comentário");
    }
  };

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

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
        />
        <textarea
          placeholder="Escreva um comentário..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mb-2 rounded-lg resize-none border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 transition"
        >
          <Send size={16} /> Enviar
        </button>
      </form>

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
