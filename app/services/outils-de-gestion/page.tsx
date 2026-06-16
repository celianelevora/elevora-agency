import { redirect } from 'next/navigation';

// Ancienne page « Outils de gestion » remplacée par la page CRM dédiée.
export default function Page() {
  redirect('/services/crm-outil-de-gestion');
}
