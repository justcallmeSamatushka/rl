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
        return {
          type: 'postgres',
          host: 'discoverystudio.xyz',
          port: 5432,
          username: 'postgres',
          password: 'root1234',
          database: 'sam_db',
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
