import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    let data: Record<string, any> = {};

    // Accepter JSON ou FormData (les nouveaux formulaires envoient FormData
    // pour pouvoir joindre une piece jointe sans surcout)
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      data = await request.json();
    } else {
      const fd = await request.formData();
      fd.forEach((value, key) => {
        // Pour les checkbox multiples (features) on construit un tableau
        if (data[key] !== undefined) {
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      });
    }

    const formType = data.form_type || 'contact_simple';
    const required =
      formType === 'start_project'
        ? ['first_name', 'last_name', 'email', 'project_type', 'description', 'objective']
        : ['first_name', 'last_name', 'email', 'subject', 'message'];

    for (const field of required) {
      const v = data[field];
      if (!v || (typeof v === 'string' && v.trim() === '')) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis.` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(data.email))) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    console.log(`[${formType}] Nouvelle demande :`, {
      from: `${data.first_name} ${data.last_name} <${data.email}>`,
      phone: data.phone_full || data.phone,
      company: data.company,
      project_type: data.project_type,
      objective: data.objective,
      budget: data.budget,
      features: data.features,
      subject: data.subject,
      message: data.message || data.description,
    });

    // TODO Resend : a brancher quand RESEND_API_KEY sera configure
    // npm install resend ; ajouter env var ; appeler resend.emails.send(...)

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Erreur API /api/contact :', err);
    return NextResponse.json(
      { error: 'Erreur serveur. Merci de réessayer.' },
      { status: 500 }
    );
  }
}
