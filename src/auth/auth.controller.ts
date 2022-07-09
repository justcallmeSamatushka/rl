import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/users-entity';
import { AuthService } from './auth.service';
import { SigninDto, UserDto } from './dto/user-dto';

@ApiTags('Авторизация и Регистрация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Регистраци пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  signup(@Body() dto: UserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200 })
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
