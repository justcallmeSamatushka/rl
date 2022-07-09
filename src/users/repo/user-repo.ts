import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/users-entity';

@EntityRepository(UserEntity)
export class UserRepo extends Repository<UserEntity> {}
