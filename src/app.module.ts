import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from "./users/entity/users-entity";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`,
      })],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        console.log("config", config.get("PGHOST"));
        return {
          type: 'postgres',
          host: config.get('PGHOST'),
          port: config.get<number>('PGPORT'),
          username: config.get('PGUSER'),
          password: config.get('PGPASSWORD'),
          database: config.get('PGDATABASE'),
          entities: [UserEntity],
          synchronize: config.get('NODE_ENV') === 'dev',
          autoLoadEntities: true,
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
