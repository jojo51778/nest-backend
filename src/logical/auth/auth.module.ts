import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { JwtStrateGy } from './jwt.strategy'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
    UserModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrateGy],
  exports: [AuthService],
})
export class AuthModule {}
