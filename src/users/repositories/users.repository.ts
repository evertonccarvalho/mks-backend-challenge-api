import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { SigninDto } from '../../auth/dtos/sign-in.dto';
import { AuthService } from '@/auth/auth.service';
import { SignupDto } from '@/auth/dtos/sign-up.dto';
import { AuthResponse } from '@/auth/models/jwt-payload.model';
import { encrypt } from '@/application/encrypter/encrypter';
import { EmailIsTakenError } from '../errors';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findOne({
      where: { email: signupDto.email },
    });

    if (existingUser) {
      throw new EmailIsTakenError();
    }

    const newUser = this.userRepository.create({
      ...signupDto,
      password: await encrypt(signupDto.password),
    });

    const savedUser = await this.userRepository.save(newUser);

    const accessToken = await this.authService.createAccessToken(savedUser.id);

    return { name: savedUser.name, email: savedUser.email, accessToken };
  }

  public async signIn(signinDto: SigninDto): Promise<AuthResponse> {
    const user = await this.findByEmail(signinDto.email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const match = await user.comparePassword(signinDto.password);
    if (!match) {
      throw new NotFoundException('Credenciais inválidas');
    }
    const accessToken = await this.authService.createAccessToken(user.id);

    return { name: user.name, accessToken, email: user.email };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.remove(user);
  }
}
