// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

"use client";
import { emailSchema } from "@/lib/mail";

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sendMail } from "@/lib/http/sendmail";
import { Loading } from "./loading";

// Begin - Lucas: Modulariza componente
import { TextInput } from "./TextInput";
import { TextAreaInput } from "./TextAreaInput";
import styles from './Email.module.css';
import { SubmitButton } from "./SubmitButton";
// End - Lucas: Modulariza componente

type DataSchema = z.infer<typeof emailSchema>;

export  function Email() {

  const useClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors }} = useForm<DataSchema>({
    resolver: zodResolver(emailSchema),
  });

  // async function onSubmit({ email, message, subject}: DataSchema) {
  //       const res = await sendMail([{
  //           email,
  //           subject,
  //           message,
  //       }]);

  //       if(res === 200){

  //           setStatus("Email enviado com sucesso!");
  //           reset();
  //           useClient.invalidateQueries({ queryKey: ["email"] });

  //       }else{

  //         setStatus("Erro ao enviar email. Tente novamente.");
  //       }
  //   };


  const mutation = useMutation({
    mutationFn: async ({ email, subject, message, name }: DataSchema) => {
      return sendMail([{ name, email, subject, message }]);
    },
    onSuccess: () => {
      useClient.invalidateQueries({ queryKey: ["email"] });
      reset();
    },
  });
  
  async function onSubmit(data: DataSchema) {
    mutation.mutate(data);
  }


// Begin - Lucas: Modulariza componente
 return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      noValidate
    >
      {mutation.isPending ? (
        <Loading />
      ) : (
        <>

          <TextInput
            id="subject"
            type="text"
            {...register("subject")}
            placeholder="Assunto"
            error={errors.subject?.message}
            autoComplete="off"
          />

          <TextAreaInput
            id="message"
            {...register("message")}
            placeholder="Mensagem"
            error={errors.message?.message}
            autoComplete="off"
          />
        </>
      )}

      <SubmitButton status={
        mutation.isError
          ? "error"
          : mutation.isSuccess
          ? "success"
          : mutation.isPending
          ? "pending"
          : "default"
      } disabled={mutation.isPending}>
        {mutation.isError
          ? "Erro ao enviar email. Tente novamente."
          : mutation.isSuccess
          ? "Email enviado com sucesso!"
          : mutation.isPending
          ? "Enviando..."
          : "Enviar"}
      </SubmitButton>
    </form>
  );
// End - Lucas: Modulariza componente
}