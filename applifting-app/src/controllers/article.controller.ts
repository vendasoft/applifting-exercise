
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {LoggingBindings, WinstonLogger} from '@loopback/logging';
import {del, get, param, patch, post, requestBody} from '@loopback/rest';
import {Article} from '../models';
import {ArticleDetail} from '../models/article-detail.model';
import {ArticleService} from '../services';

export class ArticleController {
  constructor(@inject('services.ArticleService') private articleService: ArticleService) { }

  @authenticate('jwt')
  @get('/articles')
  async list(): Promise<Array<Article>> {
    const articles = await this.articleService.getAllArticles();
    return articles;
  }

  @authenticate('jwt')
  @get('/articles/{articleId}')
  async get(@param.path.string('articleId') articleId: string): Promise<ArticleDetail> {
    const article = await this.articleService.getArticle(articleId);
    return article;
  }

  @authenticate('jwt')
  @post('/articles')
  async addArticle(@requestBody() article: Partial<ArticleDetail>): Promise<ArticleDetail> {
    return this.articleService.crateArticle(article as ArticleDetail);
  }

  @authenticate('jwt')
  @patch('/articles/{articleId}')
  async updateArticle(@param.path.string('articleId') articleId: string, @requestBody() article: Partial<ArticleDetail>): Promise<ArticleDetail> {
    return this.articleService.updateArticle(articleId, article as ArticleDetail);

  }

  @authenticate('jwt')
  @del('/articles/{articleId}')
  async deleteArticle(@param.path.string('articleId') articleId: string): Promise<void> {
    await this.articleService.deleteArticle(articleId);
  }
}

