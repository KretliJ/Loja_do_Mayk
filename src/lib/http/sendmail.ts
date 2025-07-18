// Desenvolvido por [Danilo Da Silva Batista] - https://github.com/kovarike
// Este código foi criado/alterado por mim.

import axios from "axios";
import { z } from "zod";
import { emailSchema, emailSchemaPay } from "../mail";

type DataSchemaEmail = z.infer<typeof emailSchema >;
type DataSchemaPay = z.infer<typeof emailSchemaPay >;

export async function sendMail([{name, email, message, subject, }]: DataSchemaEmail[]): Promise<any>{
    const data = {
        name,
        email, 
        subject,
        message, 
    };
    
    const  res = await axios.post('/api/contact', data);

    return res.status;
       
}

export async function sendMailPay([{name, email, cep, cidade, estado,  rua, complemento, subject, formaPagamento}]: DataSchemaPay[]){
    const data = {
        name,
        email, 
        subject,
        cep,
        cidade,
        estado,
        rua,
        complemento,
        formaPagamento 
    };
    
    await axios.post('/api/email', data);

    
       
}