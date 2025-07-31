import { Role } from "@prisma/client";
import { ReactNode } from "react";
import { MainLayout } from "@/components/admin/common/MainLayout";
import { RoleGuard } from "@/components/admin/common/RoleGuard";
import AccountProvider from "@/providers/AccountContext";
import { LocalesApi } from "@/lib/api/services/api/locales.api";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function layout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const locales = (await LocalesApi.get({ take: 1000, skip: 0 })).data.items;
  return (
    <AccountProvider>
      <RoleGuard required_role={Role.ADMIN} redirect_to="/auth/login">
        <MainLayout locale={locale} locales={locales}>{children}</MainLayout>
      </RoleGuard>
    </AccountProvider>
  );
}
