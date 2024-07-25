import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<any>(
      'permission',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermission) {
      return true;
    }
    const { auth } = context.switchToHttp().getRequest();
    const permissionResponse: any = await this.authService.verifyPermission(
      auth,
      requiredPermission as string,
    );
    if (permissionResponse.status === false) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        success: false,
        message: permissionResponse.message,
      });
    }
    return true;
  }
}
