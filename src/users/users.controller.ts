import { Body, Controller, Delete, Get, Headers, Param, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/users-entity';

@ApiTags('Получение Пользователей')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение информации о себе' })
  @ApiResponse({ status: 200, type: UserEntity })
  aboutMe(@Headers() headers) {
    return this.userService.aboutMe(headers);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiResponse({ status: 200, type: UserEntity })
  deleteUser(@Param() param) {
    return this.userService.deleteById(param.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить данные у пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  updateUser(@Param('id') id, @Body() dto: UserEntity) {
    return this.userService.updateUser({
      ...dto,
      id: +id
    });
  }
}
