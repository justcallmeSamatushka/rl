import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/users-interface';

@Entity({
  name: 'users',
})
export class UserEntity implements IUser {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({
    type: 'text',
    nullable: false,
  })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @ApiProperty({ example: 'Samat', description: 'Имя' })
  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;

  @ApiProperty({ example: '23', description: 'Возраст' })
  @Column({
    type: 'text',
    nullable: false,
  })
  age: number;

  @ApiProperty({ example: 'client', description: 'Клиент' })
  @Column({
    type: 'text',
    default: 'client',
  })
  role: string;

  @ApiProperty({ example: 'active', description: 'Статус' })
  @Column({
    type: 'text',
    default: 'new',
  })
  status: string;
}
