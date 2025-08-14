import { Contacts } from '@/components/public/pages/contacts';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('public.pages.contacts.metadata');
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function ContactsPage() {
  return <Contacts />;
}