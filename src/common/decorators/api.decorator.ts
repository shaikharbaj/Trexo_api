import { SetMetadata } from '@nestjs/common';

export const Api = (slug: string) => SetMetadata('apiSlug', slug);
