import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from '../auth/dtos/sign-up.dto';
import { SigninDto } from '../auth/dtos/sign-in.dto';
import { AuthenticatedUser } from '@/auth/interfaces';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 409, description: 'Conflito de email' })
  signUp(@Body() signUpDto: SignupDto): Promise<AuthenticatedUser> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SigninDto): Promise<AuthenticatedUser> {
    return this.authService.signIn(signInDto);
  }
}
