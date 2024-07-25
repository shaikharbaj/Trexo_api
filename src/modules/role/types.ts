export interface CreateRoleBody {
  role_name: string;
  slug: string;
  description: string;
  is_active: boolean;
  permissions: string;
};
