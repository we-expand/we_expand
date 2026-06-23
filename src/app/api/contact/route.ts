import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Apenas declaramos a variável, não inicializamos imediatamente.
let resend: Resend;

export async function POST(request: Request) {
  try {
    // Inicialização atrasada: o Resend só é chamado quando alguém clica no botão "Enviar"
    // Isso impede o Next.js de tentar rodar isso durante o processo de build
    if (!resend) {
      resend = new Resend("re_NHnfHYcv_ADPQcaTLGxwiyU31Xv8fbYVZ");
    }

    const { name, email, company, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'We Expand Intel <onboarding@resend.dev>', 
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
          <p style="font-