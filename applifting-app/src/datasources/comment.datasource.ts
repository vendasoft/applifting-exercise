import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Comment',
  connector: 'postgresql',
  url: '',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

@lifeCycleObserver('datasource')
export class CommentDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'Comment';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Comment', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
