import { Module } from '@nestjs/common';
import { UserModule } from './logical/user/user.module';
import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [AuthService],
})
export class AppModule {}
