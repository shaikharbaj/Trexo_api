export interface CreateCategoryBody {
    division_id: number;
    category_name: string;
    is_active?: boolean;
}

export interface ToggleCategoryVisibilityBody {
    is_active: boolean;
}

export interface UpdateCategoryBody {
    division_id: number;
    category_name: string;
    is_active?: boolean;
}

