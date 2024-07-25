export interface CreateTestimonialBody {
  customer_name: string;
  designation?: string;
  rating: number;
  review?: string;
  source_name?: string;
  image?: string;
  company_name?: string;
  location_city?: string;
  title?: string;
  is_active: boolean;
}

export interface ToggleTestimonialVisibilityBody {
  is_active: boolean | string;
}

export interface UpdateTestimonialBody {
  customer_name: string;
  designation?: string;
  rating: number;
  review?: string;
  source_name?: string;
  image?: string;
  company_name?: string;
  location_city?: string;
  title?: string;
  is_active: boolean;
}
