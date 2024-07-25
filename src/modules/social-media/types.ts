export interface CreateSocialMediaBody {
    slug: string;
    title: string;
    link: string;
    is_active?: boolean;
}

export interface ToggleSocialMediaVisibilityBody {
    is_active: boolean;
}

export interface UpdateSocialMediaBody {
    slug: string;
    title: string;
    link: string;
    is_active?: boolean;
}

