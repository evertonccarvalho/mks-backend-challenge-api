import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';
import { SigninDto } from '../auth/dtos/sign-in.dto';
import { SignupDto } from '../auth/dtos/sign-up.dto';
import { AuthResponse } from '@/auth/models/jwt-payload.model';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async signIn(signinDto: SigninDto): Promise<AuthResponse> {
    return this.userRepository.signIn(signinDto);
  }

  async signUp(signupDto: SignupDto): Promise<AuthResponse> {
    return this.userRepository.signUp(signupDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.remove(id);
  }
}
