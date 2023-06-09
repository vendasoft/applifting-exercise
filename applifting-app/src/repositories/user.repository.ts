import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export type Credentials = {
  userName: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.User') dataSource: UserDataSource) {
    super(User, dataSource);
  }
}
