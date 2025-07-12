// components/PaymentForm.tsx
"use client";
import { Produto } from '@/types/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { sendMailPay } from "@/lib/http/sendmail";
import { emailSchemaPay } from '@/lib/mail';


type DataSchema = z.infer<typeof emailSchemaPay>;

interface Props {
  produto: Produto | null
  
}

// Lucas update component theme
export function PaymentForm({produto}:Props) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors}} = useForm<DataSchema>({
    resolver: zodResolver(emailSchemaPay),
  });

  async function onSubmitForm(data: DataSchema) {
    await sendMailPay([{
      name: data.name,
      email: data.email,
      subject: produto?.title,
      formaPagamento: data.formaPagamento,
      rua: data.rua,
      complemento: data.complemento,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,

    }]);

    queryClient.invalidateQueries({ queryKey: ["email"] });
    reset();

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="mt-4 space-y-3 bg-[var(--container-bg)] text-[var(--container-text)] border border-[var(--container-border)] rounded-md p-4 w-full mx-auto"
    >
      <label className="block">
        Nome:
        <input
          type="text"
          {...register("name")}
          className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] p-2 rounded"
          placeholder="Digite seu nome"
        />
      </label>

      <label className="block">
        E-mail:
        <input
          type="email"
          {...register("email")}
          className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] p-2 rounded"
          placeholder="Digite seu e-mail"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label>
          Rua:
          <input
            {...register("rua")}
            className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] p-2 rounded"
            placeholder="Rua..."
          />
        </label>

        <label>
          Cidade:
          <input
            {...register("cidade")}
            className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] p-2 rounded"
            placeholder="Cidade..."
          />
        </label>

        <label>
          Estado:
          <input
            {...register("estado")}
            className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] p-2 rounded"
            placeholder="Estado..."
          />
        </label>

        <label>
          CEP:
          <input
            {...register("cep")}
            className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] p-2 rounded"
            placeholder="CEP..."
          />
        </label>

        <label className="md:col-span-2">
          Complemento:
          <input
            {...register("complemento")}
            className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] p-2 rounded"
            placeholder="Apartamento, bloco, etc..."
          />
        </label>
      </div>

      <div>
        <label>Forma de pagamento:</label>
        <select
          {...register("formaPagamento")}
          className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] p-2 rounded"
        >
          <option value="pix">Pix</option>
          <option value="cartao">Cartão</option>
          <option value="boleto">Boleto</option>
        </select>
      </div>

      <div className="w-full flex flex-col items-center">
        <button
          type="submit"
          className="bg-[var(--button-bg-default)] hover:bg-[var(--button-bg-hover)] text-[var(--button-text-default)] px-4 py-2 rounded w-60 disabled:opacity-50"
        >
          Confirmar compra
        </button>
      </div>
    </form>
  );
}
