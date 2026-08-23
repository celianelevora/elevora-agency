import { permanentRedirect } from 'next/navigation';

// Ancienne page « Outils de gestion » remplacée par la page CRM dédiée.
export default function Page() {
  permanentRedirect('/services/crm-outil-de-gestion'); // 308 : Google consolide vers la page cible
}
