import {
  injectable,
  /* inject, */ BindingScope,
  BindingKey,
} from '@loopback/core';
import {genSalt, hash} from 'bcryptjs';
import {compare} from 'bcryptjs';

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
}

export type HashPassword = (
  password: string,
  rounds: number,
) => Promise<string>;

export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}

@injectable({scope: BindingScope.TRANSIENT})
export class BcryptHasher implements PasswordHasher<string> {
  rounds = 12;
  constructor() {}

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.rounds);
    return hash(password, salt);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const passwordIsMatched = await compare(providedPass, storedPass);
    return passwordIsMatched;
  }
}
