// Uncomment these imports to begin using these cool features!

import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {AccessToken, TokenTypes} from '../key';
import {Credentials} from '../repositories';
import {JWTService, UserManagementService} from '../services';

// import {inject} from '@loopback/core';

export class UserController {
  constructor(
    @inject('services.UserManagementService')
    private userService: UserManagementService,
    @inject('services.JWTService') private jwtService: JWTService,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string,
  ) {}

  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(@requestBody() cred: Credentials): Promise<AccessToken> {
    const foundUser = await this.userService.verifyCredentials(cred);

    if (!foundUser) {
      throw HttpErrors[401];
    }
    const userProfile = this.userService.convertToUserProfile(foundUser);
    const token = await this.jwtService.generateToken(userProfile);

    return {
      accessToken: token,
      exiresIn: Number(this.jwtExpiresIn),
      tokenType: TokenTypes.Bearer,
    };
  }

  @post('/users', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userName: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async createUser(
    @requestBody() cred: Credentials,
  ): Promise<{userName: string}> {
    const user = await this.userService.createUser(cred);

    return {
      userName: user.userName,
    };
  }
}
