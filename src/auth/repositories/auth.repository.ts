import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { SigninDto } from '../dtos/sign-in.dto';
import { SignupDto } from '@/auth/dtos/sign-up.dto';
import { encrypt } from '@/application/encrypter/encrypter';
import { AuthenticatedUser } from '@/auth/interfaces';
import { UserEntity } from '@/users/entities/user.entity';
import { EmailIsTakenError } from '@/users/errors';
import { JwtService } from '@nestjs/jwt'; // Importe JwtService
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<AuthenticatedUser> {
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

    const accessToken = await this.createAccessToken(savedUser.id);

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
    const accessToken = await this.createAccessToken(user.id);

    return { id: user.id, name: user.name, accessToken, email: user.email };
  }

  async createAccessToken(userId: string): Promise<string> {
    return this.jwtService.sign(
      { userId },
      { expiresIn: process.env.JWT_EXPIRATION, secret: process.env.JWT_SECRET },
    );
  }

  async validateUser(jwtPayload: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: jwtPayload.userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  private async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    return user;
  }
}
