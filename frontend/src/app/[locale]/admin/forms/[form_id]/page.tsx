import { Info } from '@/components/admin/pages/forms/form/Info';

interface FormDetailPageProps {
  params: Promise<{ form_id: string }>;
}

export default async function FormDetailPage({ params }: FormDetailPageProps) {
  const { form_id } = await params;
  return <Info form_id={form_id} />;
} 