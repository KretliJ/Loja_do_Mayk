// Lucas: Criar rota de contato

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { emailSchema } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = emailSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validation.error?.format() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validation.data;

    // Sanitize inputs
    const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedEmail = email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedSubject = subject?.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.TOKEN,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 40px 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
          <div style="background-color: #4B7BE5; padding: 20px; text-align: center;">
            <h2 style="color: #fff; margin: 0;">MaykShop</h2>
            <p style="color: #fff; margin: 5px 0 0; font-size: 14px;">Nova Mensagem de Contato</p>
          </div>

          <div style="padding: 30px;">
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
              <strong>${sanitizedName}</strong> entrou em contato.
            </p>

            <p style="font-size: 16px; margin: 10px 0;"><strong>Assunto:</strong> ${sanitizedSubject}</p>
            <p style="font-size: 16px; margin: 10px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
            <p style="font-size: 16px; margin: 10px 0;"><strong>Mensagem:</strong></p>
            <div style="background: #f1f1f1; padding: 15px; border-radius: 5px;">${sanitizedMessage}</div>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

            <p style="font-size: 15px; color: #777;">
              Mensagem enviada a partir do formulário de contato do site.
            </p>
          </div>

          <div style="background-color: #fafafa; text-align: center; padding: 15px; font-size: 13px; color: #aaa;">
            © ${new Date().getFullYear()} MaykShop. Todos os direitos reservados.
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.EMAIL}>`,
      to: `${process.env.EMAIL}, ${sanitizedEmail}`,
      subject: `Contato: ${sanitizedSubject}`,
      html,
      replyTo: sanitizedEmail,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Mensagem enviada com sucesso!" }, { status: 200 });

  } catch (error) {
    console.error("Erro ao enviar email de contato:", error);
    return NextResponse.json({ error: "Erro interno ao enviar email" }, { status: 500 });
  }
}
