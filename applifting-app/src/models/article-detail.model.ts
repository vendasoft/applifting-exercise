import {hasMany, model, property} from '@loopback/repository';
import {Article} from './article.model';
import {Comment} from './comment.model';

@model({
  settings: {postgresql: {schema: 'public', table: 'article'}},
})
export class ArticleDetail extends Article {
  @property({
    type: 'string',
    postgresql: {
      columnName: 'content',
      dataType: 'text',
      nullable: 'YES',
    },
  })
  content: string;

  @hasMany(() => Comment, {keyTo: 'articleId'})
  comments?: Comment[];

  constructor(data?: Partial<Article>) {
    super(data);
  }
}

export interface ArticleDetailRelations {
  // describe navigational properties here
}

export type ArticleDetailWithRelations = ArticleDetail & ArticleDetailRelations;
