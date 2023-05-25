import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Article',
  connector: 'postgresql',
  url: '',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

@lifeCycleObserver('datasource')
export class ArticleDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'Article';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Article', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
