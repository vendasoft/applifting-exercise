import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ArticleDetailDataSource} from '../datasources';
import {ArticleDetail, ArticleDetailRelations, Comment} from '../models';
import {CommentRepository} from './comment.repository';

export class ArticleDetailRepository extends DefaultCrudRepository<
  ArticleDetail,
  typeof ArticleDetail.prototype.articleId,
  ArticleDetailRelations
> {
  public readonly comments: HasManyRepositoryFactory<
    Comment,
    typeof Comment.prototype.articleId
  >;

  constructor(
    @inject('datasources.ArticleDetail') dataSource: ArticleDetailDataSource,
    @repository.getter('CommentRepository')
    commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(ArticleDetail, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor(
      'comments',
      commentRepositoryGetter,
    );
  }
}
