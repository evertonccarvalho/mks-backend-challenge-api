import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/sign-up.dto';
import { SigninDto } from './dto/sign-in.dto';
import { AuthenticatedUser } from '@/auth/interfaces';
import { AuthService } from '../../../auth/auth.service';
import { Public } from '../../common/decorators/auth-guard.decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 409, description: 'Conflito de email' })
  signUp(@Body() signUpDto: SignupDto): Promise<AuthenticatedUser> {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SigninDto): Promise<AuthenticatedUser> {
    return this.authService.signIn(signInDto);
  }
}
