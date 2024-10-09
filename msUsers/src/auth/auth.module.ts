import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/http/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // Asegúrate de que esta línea esté presente
import { jwtSecret} from './jwt/jwt.secret'

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }), // Corrige el nombre aquí
    JwtModule.register({
      global:true,
      secret: jwtSecret.secret, // Cambia esto a una variable de entorno en producción
      signOptions: { expiresIn: '1d' }, // Configura el tiempo de expiración por defecto de los tokens
    }),UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
