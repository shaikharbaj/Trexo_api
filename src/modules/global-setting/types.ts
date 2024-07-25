export interface CreateGlobalSettingBody {
    site_name: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    footer_content: string;
    is_active?: boolean;
}

