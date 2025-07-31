import { useAccount as useAccountContext, AccountContextType } from "@/providers/AccountContext";

export const useAccount = (): AccountContextType => useAccountContext()