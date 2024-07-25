export interface CreateFaqBody {
    faq_type: string;
    faq_category_id: number;
    question: string;
    answer: string;
    is_active?: boolean;
  }
  
  export interface UpdateFaqBody {
    faq_type: string;
    faq_category_id: number;
    question: string;
    answer: string;
    is_active?: boolean;
  }
  
  export interface toggleFaqBody {
    is_active: boolean | string;
  }
  