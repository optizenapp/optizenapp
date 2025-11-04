import { redirect } from 'next/navigation';
import { getDocsForApp, isValidApp, type AppType } from '@/lib/docs-mapping';

interface PageProps {
  params: Promise<{
    app: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { app: 'optizenai' },
    { app: 'video-upsells' },
  ];
}

export default async function AppDocsIndex({ params }: PageProps) {
  const { app } = await params;

  // Validate app
  if (!isValidApp(app)) {
    redirect('/support-docs');
  }

  // Get first doc for this app
  const docs = getDocsForApp(app as AppType);
  if (docs.length === 0) {
    redirect('/support-docs');
  }

  // Redirect to first doc
  redirect(`/support-docs/${app}/${docs[0].nextSlug}`);
}

