import { Module } from '@nestjs/common';
import { UserModule } from './logical/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
