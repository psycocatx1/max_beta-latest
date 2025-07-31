export type SessionType = {
  data: {
    user_id: string;
    created_at: string;
    expires_at: string;
    ip_address: string;
    is_active: boolean;
    user_agent: string;
  },
  id: string;
}