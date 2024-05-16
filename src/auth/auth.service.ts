import { Injectable } from '@nestjs/common';

import { AuthenticatedUser, JwtPayload } from './interfaces';
import { SigninDto, SignupDto } from '../infra/http/auth/dto';
import { AuthRepository } from '../users/repositories/auth.repository';
import { UserEntity } from '@/users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signIn(signinDto: SigninDto): Promise<AuthenticatedUser> {
    return this.authRepository.signIn(signinDto);
  }

  async signUp(signupDto: SignupDto): Promise<AuthenticatedUser> {
    return this.authRepository.signUp(signupDto);
  }

  async validateUser(jwtPayload: JwtPayload): Promise<UserEntity> {
    return this.authRepository.validateUser(jwtPayload);
  }
}
