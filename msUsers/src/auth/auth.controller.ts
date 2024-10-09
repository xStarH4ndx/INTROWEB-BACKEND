import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { MyGuard } from './jwt/my.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(MyGuard)
  @Get('profile')
  profile(@Request() req:Request) {
    // Retorna directamente la información del usuario
    //return req.user; // Retorna los datos del usuario
    //const user = request.headers['user'];
    return this.authService.profile(req);
}

  @Post('refresh')
  refresh(@Body('refresh_token') refreshToken:string)//@Body solo accedera al valor de refresh_token
  {
    return this.authService.refresh(refreshToken);
  }
}
