import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa o Resend com a variável de ambiente segura
const resend = new Resend(re_NHnfHYcv_ADPQcaTLGxwiyU31Xv8fbYVZ);

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json();

    // Dispara o e-mail de forma automática
    const { data, error } = await resend.emails.send({
      from: 'We Expand Intel <onboarding@resend.dev>', // Quando verificar o domínio, mudamos para contato@we-expand.com
      to: ['info@we-expand.com'],
      subject: `🔥 Novo Mapeamento Operacional: ${company}`,
      html: `
        <div style="font-family: system-ui, sans-serif; background-color: #050505; color: #ffffff; padding: 40px; border-radius: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #111;">
          <h2 style="color: #00F0FF; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; border-bottom: 1px solid #1a1a1a; padding-bottom: 12px;">
            Sinal Neural Recebido
          </h2>
          <div style="space-y: 12px; font-size: 14px; line-height: 1.6;">
            <p><strong style="color: #7000FF;">Líder do Projeto:</strong> ${name}</p>
            <p><strong style="color: #7000FF;">Corporação:</strong> ${company}</p>
            <p><strong style="color: #7000FF;">E-mail Executivo:</strong> ${email}</p>
            <br />
            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 0.2em; color: #444; font-weight: bold; margin-bottom: 8px;">
              Gargalo / Desafio Mapeado:
            </p>
            <div style="background-color: #0a0a0a; padding: 20px; border-radius: 16px; border: 1px solid #1a1a1a; font-style: italic; color: #b3b3b3;">
              "${message}"
            </div>
          </div>
          <br />
          <hr style="border: 0; border-top: 1px solid #1a1a1a; margin-top: 24px;" />
          <p style="font-size: 10px; color: #333; text-align: center; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 16px;">
            We Expand Consulting // Algorithmic System
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}