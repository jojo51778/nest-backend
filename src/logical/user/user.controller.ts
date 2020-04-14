import { Controller, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../auth/auth.service'
import { UserService } from './user.service'
import { ValidationPipe } from '../../pipe/validation.pipe';
import { FindDTO, LoginDTO, RegisterInfoDTO } from './user.dto'; // 引入 DTO
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth() // Swagger 的 JWT 验证
@ApiTags('user') // 添加 接口标签 装饰器
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService, private readonly usersService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('find-one')
  findOne(@Body() body: FindDTO) {
    return this.usersService.findOne(body.username)
  }

  @Post('login')
  async login(@Body() loginParams: LoginDTO) {
    console.log('JWT验证 - Step 1: 用户请求登录')
    const authResult = await this.authService.validateUser(loginParams.username, loginParams.password);
    switch(authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user)
      case 2:
        return {
          code: 600,
          msg: '账号或密码不正确'
        }
      default:
        return {
          code: 600,
          msg: '查无此人'
        }
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) { //指定DTO类型
    return await this.usersService.register(body)
  }
}
