import { Module } from '@nestjs/common';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { CommodityService } from './logical/commodity/commodity.service';
import { CommodityController } from './logical/commodity/commodity.controller';

@Module({
  imports: [UserModule, AuthModule],
  providers: [CommodityService],
  controllers: [UserController, CommodityController]
})
export class AppModule {}
