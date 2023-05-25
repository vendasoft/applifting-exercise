import {UserService} from '@loopback/authentication';
import {/* inject, */ BindingScope, inject, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {BcryptHasher} from './password-hasher.service';

@injectable({scope: BindingScope.TRANSIENT})
export class UserManagementService implements UserService<User, Credentials> {
  constructor(
    @inject('repositories.UserRepository')
    private userRepository: UserRepository,
    @inject('services.BcryptHasher') private passwordHasher: BcryptHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const {userName, password} = credentials;
    const invalidCredentialsError = 'Invalid email or password.';

    if (!userName) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const foundUser = await this.userRepository.findOne({
      where: {userName},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      password,

      foundUser.passHash,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  async createUser(cred: Credentials): Promise<User> {
    const passHash = await this.passwordHasher.hashPassword(cred.password);
    const createdUser = await this.userRepository.create({
      userName: cred.userName,
      passHash: passHash,
    });

    return createdUser;
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.id.toString(),
      name: user.userName,
    };
  }
}
