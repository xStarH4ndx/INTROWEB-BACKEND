import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/http/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService:UserService,
    private readonly jwtService:JwtService
  ){}

  async login(loginDto:LoginDto) {
    const {email, password} = loginDto
    
    try{
      //Verificamos si existe el email
      const user = await this.userService.findOneByEmail(email);
      if(!user) throw new NotFoundException(`El usuario con el email: ${email} no ha sido encontrado`)
      //Verificamos la contraseña ingresada
      const passwordMatch = await bcrypt.compare(password,user.password);
      if(!passwordMatch) throw new UnauthorizedException(`La contraseña es incorrecta`)
      //Generamos el contrato
      const payload = {id:user.id,email:user.email,name:user.name}
      //Generamos el token
      const token = await this.jwtService.signAsync(payload,{expiresIn:'15m'});

      //Falta retornarle tambien el Refresh_token
      const refreshToken = await this.jwtService.signAsync(payload,{expiresIn:'7d'})

      return {
        access_token: token,
        refresh_token: refreshToken,
        email:user.email,
        name:user.name,
      };
      
    }catch(error){
      throw new InternalServerErrorException(`Error inesperado ${error}`)
    }
  }

  
  profile(req: Request) {
    const token = this.extractTokenFromHeader(req);
    
    if (token) {
      try {
        const payload = this.jwtService.verify(token); // Decodifica el token
        return payload; // Retorna el payload decodificado
      } catch (error) {
        return { error: 'Token inválido' }; // Maneja el error si el token no es válido
      }
    } else {
      return { error: 'Token no proporcionado' }; // Maneja el caso de que no se proporcione un token
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {//Observar porque puede estar malo
    const authorizationHeader = (request.headers as any).authorization;
  const [type, token] = authorizationHeader?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;

  }

  async refresh(refreshToken:string)
  {
    const payload = await this.jwtService.verifyAsync(refreshToken).catch(()=>{
      throw new UnauthorizedException("El refresh_token a expirado")
    });
    const newPayload = {id:payload.id,email:payload.email,name:payload.name}
    console.log(payload);
    
    
    const newAccessToken = await this.jwtService.signAsync(
      newPayload,
      {expiresIn:'15m'}
    );
    const newRefreshToken = await this.jwtService.signAsync(
      newPayload,
      {expiresIn:'7d'}
    )
    return {
      access_token:newAccessToken,
      refresh_token:newRefreshToken
    }
  }

}
