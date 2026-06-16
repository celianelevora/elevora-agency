import { redirect } from 'next/navigation';

// Ancienne page « Sites web » remplacée par les pages dédiées
// (site vitrine, e-commerce, landing). On redirige vers la vitrine pour
// préserver les liens et le référencement existants.
export default function Page() {
  redirect('/services/site-vitrine');
}
