import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {postgresql: {schema: 'public', table: 'article'}},
})
export class Article extends Entity {
  @property({
    type: 'string',
    required: false,
    id: true,
    postgresql: {
      columnName: 'article_id',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  articleId?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'title',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      nullable: 'NO',
    },
  })
  title: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'perex',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      nullable: 'NO',
    },
  })
  perex: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'created_at',
      dataType: 'timestamp with time zone',
      nullable: 'NO',
    },
  })
  createdAt: Date;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'last_updated_at',
      dataType: 'timestamp with time zone',
      nullable: 'NO',
    },
  })
  lastUpdatedAt: Date;

  constructor(data?: Partial<Article>) {
    super(data);
  }
}

export interface ArticleRelations {
  // describe navigational properties here
}

export type ArticleWithRelations = Article & ArticleRelations;
