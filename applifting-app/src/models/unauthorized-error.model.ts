import {Model, model, property} from '@loopback/repository';

@model()
export class UnauthorizedError extends Model {
  @property({
    type: 'number',
  })
  statusCode: number;

  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  message: string;

  constructor(data?: Partial<UnauthorizedError>) {
    super(data);
  }
}

export interface UnauthorizedErrorRelations {
  // describe navigational properties here
}

export type UnauthorizedErrorWithRelations = UnauthorizedError &
  UnauthorizedErrorRelations;
