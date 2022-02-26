import { UserEntity } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findRegisteredUserByEmail(
    email: string,
  ): Promise<UserEntity | undefined> {
    return this.findOne({
      email: email,
    });
  }
}
