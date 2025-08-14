import AccountProvider from "@/providers/AccountContext";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export async function generateMetadata() {
  const t = await getTranslations('public.pages.auth.metadata');
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function layout({ children }: AuthLayoutProps) {
  return <AccountProvider>{children}</AccountProvider>
}