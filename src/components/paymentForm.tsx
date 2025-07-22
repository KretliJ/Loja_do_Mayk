// components/PaymentForm.tsx
import { Produto } from '../types/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMailPay } from "../lib/http/sendmail";
import { emailSchemaPay } from '../lib/mail';
import { Loading } from './loading';
import { Separator } from './separator';


type DataSchema = z.infer<typeof emailSchemaPay>;

interface Props {
  produto: Produto | null,
  

}

export function PaymentForm({ produto }: Props) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DataSchema>({
    resolver: zodResolver(emailSchemaPay),
  });



  const mutation = useMutation({
    mutationFn: async (data: DataSchema) => {
      return await sendMailPay([{
        name: data.name,
        email: data.email,
        subject: produto?.title,
        formaPagamento: data.formaPagamento,
        rua: data.rua,
        complemento: data.complemento,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
        cupom:data.cupom

      }]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email"] });
      reset();
    },
  });

  async function onSubmitForm(data: DataSchema) {
    mutation.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mt-4 space-y-3 light:bg-background dark:bg-dark w-full mx-auto light:text-txlight dark:text-txDark flex flex-col items-center  py-2 rounded-lg">
      {mutation.isPending ? (
        <>
            <div
              className="  light:bg-background dark:bg-dark w-full mx-auto light:text-txlight dark:text-txDark max-h-[570px] h-[570px] flex justify-center items-center"
          
            >
              <div
                className="w-full light:bg-background dark:bg-dark py-6 px-10 flex flex-col items-center mx-auto"
               
              >
        
                <div className="w-full py-24 max-h[500px] h-[500px] p-8 mb-1 flex justify-center overflow-hidden flex-col mx-auto">
                  <Loading /> 
                 
            
                </div>

              </div>
            </div>
        
        </>
      ) : (
        <>
          <label className="light:bg-background dark:bg-dark block light:text-txlight dark:text-txDark w-full mx-auto">
            Nome:
            <input type="text" {...register("name", {required: errors.name?.message})} className="w-full border p-2 rounded light:bg-background dark:bg-dark mx-auto" autoComplete='off' placeholder="Digite seu nome" aria-label="Nome" title="Nome" />
          </label>

          <label className="light:bg-background dark:bg-dark block light:text-txlight dark:text-txDark w-full mx-auto">
            E-mail:
            <input type="email" {...register("email", {required: errors.email?.message})} className="w-full border p-2 rounded light:bg-background dark:bg-dark mx-auto" placeholder="Digite seu e-mail" autoComplete='off' aria-label="E-mail" title="E-mail" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 light:text-txlight dark:text-txDark w-full mx-auto">
            <label className="light:bg-background dark:bg-dark block light:text-txlight dark:text-txDark w-full mx-auto">
              Rua:
              <input {...register("rua", {required: errors.rua?.message})} className="w-full border p-2 rounded light:bg-background dark:bg-dark mx-auto" placeholder="Rua..." autoComplete='off' aria-label="Rua" title="Rua" />
            </label>

            <label className="light:bg-background dark:bg-dark block light:text-txlight dark:text-txDark w-full mx-auto">
              Cidade:
              <input {...register("cidade", {required: errors.cidade?.message})} className="w-full border p-2 rounded light:bg-background dark:bg-dark mx-auto" placeholder="Cidade..." autoComplete='off' aria-label="Cidade" title="Cidade" />
            </label>

            <label className="light:bg-background dark:bg-dark block light:text-txlight dark:text-txDark w-full mx-auto">
              Estado:
              <input {...register("estado", {required: errors.estado?.message})} className="w-full border p-2 rounded light:bg-background dark:bg-dark mx-auto" placeholder="Estado..." autoComplete='off' aria-label="Estado" title="Estado" />
            </label>

            <label className="light:bg-background dark:bg-dark block light:text-txlight dark:text-txDark w-full mx-auto">
              CEP:
              <input {...register("cep", {required: errors.cep?.message})} className="w-full border p-2 rounded light:bg-background dark:bg-dark mx-auto" placeholder="CEP..." autoComplete='off' aria-label="CEP" title="CEP" />
            </label>

            <label className="light:bg-background dark:bg-dark md:col-span-2 w-full mx-auto">
              Complemento:
              <input {...register("complemento", {required: errors.complemento?.message})} className="w-full border p-2 rounded light:bg-background dark:bg-dark mx-auto" placeholder="Apartamento, bloco, etc..." autoComplete='off' aria-label="Complemento" title="Complemento" />
            </label>

            <Separator className='bg-[#000099] mx-auto w-full max-h-10 p-[1px] rounded-md '/>

            <label className="light:bg-background dark:bg-dark md:col-span-2 w-full mx-auto">
              Cupom:
              <input {...register("cupom", {required: errors.cupom?.message})} className="w-full border p-2 rounded light:bg-background dark:bg-dark mx-auto" placeholder="Cupom" autoComplete='off' aria-label="Cupom" title="Cupom" />
            </label>
            
          </div>

          <div className="w-full flex flex-col items-center mx-auto">
            <label className="light:bg-background dark:bg-dark light:text-txlight dark:text-txDark mx-auto">Forma de pagamento:</label>
            <select {...register("formaPagamento", {required: errors.formaPagamento?.message})} className="w-full border p-2 rounded light:text-txlight dark:text-txDark">
              <option value="pix" className='light:bg-background dark:bg-dark light:text-txlight dark:text-txDark' aria-label="Pix" title="Pix">Pix</option>
              <option value="cartao" className='light:bg-background dark:bg-dark light:text-txlight dark:text-txDark' aria-label="Cartão" title="Cartão">Cartão</option>
              <option value="boleto" className='light:bg-background dark:bg-dark light:text-txlight dark:text-txDark' aria-label="Boleto" title="Boleto">Boleto</option>
            </select>
          </div>

          <div className="w-full flex flex-col items-center mx-auto">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-800 text-lg font-semibold light:text-txlight dark:text-txDark shadow cursor-pointer transition-colors duration-200 h-10 m text-center px-4  rounded w-52 disabled:opacity-50 mt-3 mx-auto"
              aria-label="Confirmar compra" title="Confirmar compra"
            >
              Confirmar compra
            </button>
          </div>
        </>
      )}

    </form>
  );
}