import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ArticleDataSource} from '../datasources';
import {Article, ArticleRelations} from '../models';

export class ArticleRepository extends DefaultCrudRepository<
  Article,
  typeof Article.prototype.articleId,
  ArticleRelations
> {
  constructor(@inject('datasources.Article') dataSource: ArticleDataSource) {
    super(Article, dataSource);
  }
}
