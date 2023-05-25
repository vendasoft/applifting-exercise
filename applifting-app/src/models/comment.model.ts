import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ArticleDetail} from './article-detail.model';

@model({
  settings: {postgresql: {schema: 'public', table: 'comment'}},
})
export class Comment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id?: number;

  @belongsTo(
    () => ArticleDetail,
    {name: 'article_id'},
    {keyFrom: 'articleId', keyTo: 'articleId'},
  )
  articleId: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'author',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      nullable: 'NO',
    },
  })
  author: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'content',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      nullable: 'NO',
    },
  })
  content: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'posted_at',
      dataType: 'timestamp with time zone',
      nullable: 'NO',
    },
  })
  postedAt: Date;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'score',
      dataType: 'integer',
      nullable: 'NO',
    },
  })
  score: number;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
