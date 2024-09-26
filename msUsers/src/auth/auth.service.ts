import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/http/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
      const token = await this.jwtService.signAsync(payload);

      return {
        token,
        email:user.email,
        name:user.name,
      };
      
    }catch(error){
      throw new InternalServerErrorException(`Error inesperado ${error}`)
    }
  }

  profile(user:any) {
    return user;
  }

}
