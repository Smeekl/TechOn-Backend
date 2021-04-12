import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    // console.log(await this.authService.login(body));
    return this.authService.login(body);
  }

  @Post('/signup')
  create(@Body() body: CreateUserDto) {
    return this.authService.create(body);
  }
}
