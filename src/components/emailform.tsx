// Lucas: Criar componente de contatosp

'use client';

import { useState } from 'react';
import { z } from 'zod';
import { sendMail } from '@/lib/http/sendmail';
import { Loader2, Send } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Assunto obrigatório'),
  message: z.string().min(10, 'Mensagem muito curta'),
});

export function EmailForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMsg('');

    const validation = schema.safeParse(form);
    if (!validation.success) {
      const firstError = Object.values(validation.error.flatten().fieldErrors)[0]?.[0];
      setErrorMsg(firstError || 'Erro de validação');
      return;
    }

    setLoading(true);
    try {
      const result = await sendMail([form]);
      if (result === 200) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Erro ao enviar o e-mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-4 border border-gray-300 rounded-md shadow-md p-6 bg-background dark:bg-dark text-txlight dark:text-txDark"
      >
        <h2 className="text-center text-2xl font-bold mb-4">Fale com a loja</h2>

        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Seu email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="subject"
          placeholder="Assunto"
          value={form.subject}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="message"
          placeholder="Escreva sua mensagem..."
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="w-full p-2 rounded border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
        {status === 'success' && <p className="text-sm text-green-600">Mensagem enviada com sucesso!</p>}
        {status === 'error' && <p className="text-sm text-red-600">Erro ao enviar mensagem.</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition duration-300"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send size={16} />}
          {loading ? 'Enviando...' : 'Enviar mensagem'}
        </button>
      </form>
    </div>
  );
}
