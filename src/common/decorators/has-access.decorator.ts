import { SetMetadata } from '@nestjs/common';

export const HasAccess = (access: string) => SetMetadata('access', access);