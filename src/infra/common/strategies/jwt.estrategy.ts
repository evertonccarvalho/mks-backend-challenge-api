import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../../services/auth.service';
import { UserEntity } from '@/infra/entities/user.entity';
import { JwtPayload } from '../../../helpers/interfaces';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<UserEntity> {
    const user = await this.authService.validateUser(jwtPayload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
