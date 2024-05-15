import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { SigninDto } from '../auth/dtos/sign-in.dto';
import { SignupDto } from '../auth/dtos/sign-up.dto';
import { UserListDto } from './dto/user-list.dto.ts';
import { AuthenticatedUser } from '@/auth/interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async signIn(signinDto: SigninDto): Promise<AuthenticatedUser> {
    return this.userRepository.signIn(signinDto);
  }

  async signUp(signupDto: SignupDto): Promise<AuthenticatedUser> {
    return this.userRepository.signUp(signupDto);
  }

  async findAll(): Promise<UserListDto[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<UserListDto> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.remove(id);
  }
}
