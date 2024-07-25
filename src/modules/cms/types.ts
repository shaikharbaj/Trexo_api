export interface CreateCmsBody {
  title: string;
  content: string;
  slug: string;
  images?: any;
  is_active?: boolean | string;
}

export interface toggleCmsVisibilityBody {
  is_active: boolean;
}

export interface UpdateCmsBody {
  title: string;
  content: string;
  slug: string;
  images?: any;
  is_active?: boolean | string;
}
