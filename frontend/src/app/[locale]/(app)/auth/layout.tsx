import AccountProvider from "@/providers/AccountContext";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function layout({ children }: AuthLayoutProps) {
  return <AccountProvider>{children}</AccountProvider>
}