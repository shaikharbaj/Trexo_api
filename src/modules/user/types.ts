export interface CreateAdminUserBody {
  name: string;
  email_id: string;
  position: string;
  reporting_to: string;
  role_ids: any;
}

export interface ToggleAdminUserVisibilityBody {
  is_active: boolean | string;
}

export interface UpdateAdminUserBody {
  name: string;
  email_id: string;
  position: string;
  reporting_to: string;
  role_ids: any;
}

export interface RegisterBuyerBody {
  id: number;
  uuid: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_number?: string;
  pan_card_number?: string;
  aadhar_card_number?: string;
  user_type: string;
  password: string;
  confirmPassword: string;
}
export interface BuyerLoginBody {
  email: string;
  password: string;
}