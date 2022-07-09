import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '1234567', description: 'Пароль' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;

  @ApiProperty({ example: '23', description: 'Возраст' })
  readonly age?: number;

  @ApiProperty({ example: 'Самат', description: 'Имя' })
  readonly name?: string;
}

export class SigninDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '1234567', description: 'Пароль' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
