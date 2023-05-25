import {BindingScope, inject, injectable} from '@loopback/core';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import {Article} from '../models';
import {ArticleDetail} from '../models/article-detail.model';
import {ArticleDetailRepository, ArticleRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ArticleService {
  constructor(
    @inject('repositories.ArticleRepository')
    private articleRepository: ArticleRepository,
    @inject('repositories.ArticleDetailRepository')
    private articleDetailRepository: ArticleDetailRepository,
  ) {}

  async getAllArticles(): Promise<Array<Article>> {
    const articles = await this.articleRepository.find();
    return articles;
  }

  async getArticle(articleId: string): Promise<ArticleDetail> {
    const articleDetails = await this.articleDetailRepository.findById(
      articleId,
    );
    articleDetails.comments = await this.articleDetailRepository
      .comments(articleId)
      .find();
    return articleDetails;
  }

  async crateArticle(article: ArticleDetail): Promise<ArticleDetail> {
    article.articleId = uuid.v4();
    const createdArticle = await this.articleDetailRepository.create(
      _.omit(article, 'comments'),
    );
    if (article.comments) {
      createdArticle.comments = [];
      for (const comment of article.comments) {
        createdArticle.comments.push(
          await this.articleDetailRepository
            .comments(article.articleId!)
            .create(comment),
        );
      }
    }
    return createdArticle;
  }

  async deleteArticle(articleId: string): Promise<void> {
    await this.articleRepository.deleteById(articleId);
  }

  async updateArticle(
    articleId: string,
    article: ArticleDetail,
  ): Promise<ArticleDetail> {
    await this.articleDetailRepository.updateById(
      articleId,
      _.omit(article, 'comments'),
    );
    if (article.comments) {
      for (const comment of article.comments) {
        await this.articleDetailRepository.comments(articleId).create(comment);
      }
    }
    article.articleId = articleId;
    return article;
  }
}
