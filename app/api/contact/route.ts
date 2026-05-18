import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const required = ['firstname', 'lastname', 'email', 'message'];
    for (const field of required) {
      if (!data[field] || data[field].trim() === '') {
        return NextResponse.json(
          { error: `Le champ ${field} est requis.` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    console.log('Nouveau message de contact :', {
      from: `${data.firstname} ${data.lastname} <${data.email}>`,
      phone: data.phone,
      company: data.company,
      project: data.project,
      budget: data.budget,
      message: data.message,
    });

    // Pour brancher Resend (envoi d'email réel) :
    // 1. npm install resend
    // 2. Ajouter RESEND_API_KEY dans les variables d'environnement Infomaniak
    // 3. Décommenter ci-dessous

    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Elevora <noreply@elevora-agency.com>',
      to: 'contact@elevora-agency.com',
      reply_to: data.email,
      subject: `Nouveau message : ${data.firstname} ${data.lastname}`,
      html: `
        <h2>Nouveau message depuis le site</h2>
        <p><strong>Nom :</strong> ${data.firstname} ${data.lastname}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone || 'Non renseigné'}</p>
        <p><strong>Entreprise :</strong> ${data.company || 'Non renseignée'}</p>
        <p><strong>Type de projet :</strong> ${data.project || 'Non précisé'}</p>
        <p><strong>Budget :</strong> ${data.budget || 'Non précisé'}</p>
        <hr>
        <p><strong>Message :</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API contact :', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
