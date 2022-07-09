import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/auth/dto/user-dto';
import { getRepository } from 'typeorm';
import { UserEntity } from './entity/users-entity';
import { UserRepo } from './repo/user-repo';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepo, private jwtService: JwtService) {}

  async findOne(query) {
    if (!query) {
      return;
    }
    return await this.userRepo.findOne({
      where: {
        ...query,
      },
    });
  }

  async aboutMe(headers) {
    const { authorization } = headers;
    const token = authorization.split(' ')[1];

    const user = this.jwtService.decode(token);
    return user;
  }

  async create(dto: UserDto) {
    return await this.userRepo.save(dto);
  }

  async getAll() {
    const users = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.role',
        'user.age',
        'user.status',
      ])
      .getMany();
    const count = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .getCount();
    return {
      count,
      users,
    };
  }

  async deleteById(id: number) {
    const user = await this.findOne(
      { id }
    );

    if (!user) throw new HttpException('Пользователь с таким ID н найден', HttpStatus.BAD_REQUEST);

    await this.userRepo.delete({ id });

    return await this.getAll();
  }

  async updateUser(dto: UserEntity) {
    const found = await this.findOne({ id: dto.id });

    if (!found) {
      throw new HttpException("Пользователь с таким ID н найден", HttpStatus.BAD_REQUEST);
    }

    return await this.userRepo.update(dto.id, dto).then(async () => {
      const user = await this.findOne({id: dto.id});
      delete user.password;

      return user;
    });

  }
}
