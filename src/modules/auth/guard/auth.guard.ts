import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    //Extracting token from request using experss
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Unauthorized',
      });
    }
    try {
      const payload = await this.authService.verifyToken(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['auth'] = payload;
    } catch (error) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Unauthorized',
      });
    }
    return true;
  }

  //Function to extract token from header using experss
  private extractTokenFromHeader(request: any): string | undefined {
    // Check if the authorization header exists
    if (request.headers?.authorization) {
      const [type, token] = request.headers.authorization.split(' ');
      // Check if the token type is Bearer
      if (type === 'Bearer' && token) {
        return token;
      }
      return undefined;
    }
    // Return undefined if the token is not found or if it's not a Bearer token
    return undefined;
  }
}
