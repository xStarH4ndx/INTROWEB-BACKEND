import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtSecret } from "./jwt.secret";

@Injectable()
export class MyGuard implements CanActivate {
  
  constructor(
    private readonly jwtService: JwtService
  ){

  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {

      throw new UnauthorizedException();
    }

    try{
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtSecret.secret,
        }
      );

       request['user'] = payload;//Esto sirve para almacenar en la request una variable user con el payload'
       console.log(request.user)

    } catch{
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {//Observar porque puede estar malo
    const authorizationHeader = (request.headers as any).authorization;
  const [type, token] = authorizationHeader?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;

  }
}