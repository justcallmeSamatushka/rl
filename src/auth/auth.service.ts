import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entity/users-entity';
import { UsersService } from 'src/users/users.service';
import { SigninDto, UserDto } from './dto/user-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin(dto: SigninDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async signup(dto: UserDto) {
    const candidate = await this.userService.findOne({ email: dto.email });

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);

    await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    return {
      message:'Пользователь успешно зарегистрирован',
      status: HttpStatus.OK
    };
  }

  private async generateToken(user: UserEntity) {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      age: user.age,
      status: user.status,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: SigninDto) {
    const user = await this.userService.findOne({ email: dto.email });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный емайл',
      });
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный пароль',
    });
  }
}
