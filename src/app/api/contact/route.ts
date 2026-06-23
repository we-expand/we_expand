import { NextResponse } from 'next/server';
import { Resend } from 'resend';

let resend: Resend;

export async function POST(request: Request) {
  try {
    // Inicialização atrasada para garantir compatibilidade com o build da Vercel
    if (!resend) {
      resend = new Resend("re_BGtVsfeL_Ba2na9agwdyMUXjJhr8NsstR"); 
    }

    const { name, email, company, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'We Expand Intel <onboarding@resend.dev>',
      to: ['info@we-expand.com'],
      subject: `🔥 Novo Mapeamento Operacional: ${company}`,
      html: `
        <div style="font-family: sans-serif; background-color: #050505; color: #ffffff; padding: 40px; border-radius: 24px;">
          <h2 style="color: #00F0FF; font-size: 20px; font-weight: bold; margin-bottom: 24px;">Sinal Neural Recebido</h2>
          <p><strong style="color: #7000FF;">Nome:</strong> ${name}</p>
          <p><strong style="color: #7000FF;">Empresa:</strong> ${company}</p>
          <p><strong style="color: #7000FF;">E-mail:</strong> ${email}</p>
          <br/>
          <p style="color: #b3b3b3;"><strong>Gargalo Operacional:</strong></p>
          <div style="background-color: #111; padding: 20px; border-radius: 10px;">
            ${message}
          </div>
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