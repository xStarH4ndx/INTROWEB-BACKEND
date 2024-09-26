import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { MyGuard } from './jwt/my.guard';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(MyGuard)
  @Get('profile')
  profile(@Request() request:ExpressRequest) {
    // Retorna directamente la información del usuario
    //return req.user; // Retorna los datos del usuario
    //const user = request.headers['user'];
    return "Hola";
}
}
