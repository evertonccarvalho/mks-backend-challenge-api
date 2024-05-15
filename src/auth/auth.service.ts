import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from '@/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createAccessToken(userId: string): Promise<string> {
    return sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: jwtPayload.userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  private static jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Bad request.');
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return AuthService.jwtExtractor;
  }
}
