import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LangGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    //Extracting lang from request using expers
    const lang = this.extractLangFromHeader(request);
    request["lang"] = lang;
    return true;
  }

  //Function to extract token from header using experss
  private extractLangFromHeader(request: any): string | undefined {
    // Check if the language header exists
    if (request.headers["x-custom-lang"]) {
      return request.headers["x-custom-lang"];
    }
    return "en";
  }
}
