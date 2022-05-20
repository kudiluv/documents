import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from './config.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    if (
      this.configService.username === username &&
      this.configService.password === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
