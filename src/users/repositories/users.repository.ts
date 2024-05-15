import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { SigninDto } from '../../auth/dtos/sign-in.dto';
import { AuthService } from '@/auth/auth.service';
import { SignupDto } from '@/auth/dtos/sign-up.dto';
import { encrypt } from '@/application/encrypter/encrypter';
import { EmailIsTakenError } from '../errors';
import { AuthenticatedUser } from '@/auth/interfaces';
import { UserListDto } from '../dto/user-list.dto.ts';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<AuthenticatedUser> {
    const existingUser = await this.findByEmail(signupDto.email);

    if (existingUser) {
      throw new EmailIsTakenError();
    }

    const newUser = this.userRepository.create({
      ...signupDto,
      password: await encrypt(signupDto.password),
    });

    const savedUser = await this.userRepository.save(newUser);

    const accessToken = await this.authService.createAccessToken(savedUser.id);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      accessToken,
    };
  }

  async signIn(signinDto: SigninDto): Promise<AuthenticatedUser> {
    const user = await this.findByEmail(signinDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await user.comparePassword(signinDto.password);
    if (!match) {
      throw new NotFoundException('Invalid credentials');
    }
    const accessToken = await this.authService.createAccessToken(user.id);

    return { id: user.id, name: user.name, accessToken, email: user.email };
  }

  async findAll(): Promise<UserListDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserListDto(user));
  }

  async findOne(id: string): Promise<UserListDto> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserListDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserListDto> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return new UserListDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }

  private async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    return user;
  }
}
