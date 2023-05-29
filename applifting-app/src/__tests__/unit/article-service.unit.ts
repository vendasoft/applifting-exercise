import {ArticleService} from '../../services/article.service';
import {ArticleRepository, ArticleDetailRepository} from '../../repositories';
import {
  createStubInstance,
  expect,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import sinon from 'sinon';
import {Article} from '../../models';

describe('ArticleService', () => {
  let articleDetailRepository: StubbedInstanceWithSinonAccessor<ArticleDetailRepository>;
  let articleRepository: StubbedInstanceWithSinonAccessor<ArticleRepository>;
  let articleService: ArticleService;

  beforeEach(() => {
    articleDetailRepository = createStubInstance(ArticleDetailRepository);
    articleRepository = createStubInstance(ArticleRepository);
    articleService = new ArticleService(
      articleRepository,
      articleDetailRepository,
    );
  });

  after(() => {
    sinon.restore();
  });

  describe('Articles', () => {
    it('should return all articles from db', async () => {
      const find = articleRepository.stubs.find;
      find.resolves([
        new Article({
          articleId: 'test-uuid-1',
          title: 'test title',
          perex: 'perex',
          createdAt: new Date('2023-05-25 19:10:25-07'),
          lastUpdatedAt: new Date('2023-05-25 19:10:25-07'),
        }),
        new Article({
          articleId: 'test-uuid-2',
          title: 'test title',
          perex: 'perex',
          createdAt: new Date('2023-05-25 19:10:25-07'),
          lastUpdatedAt: new Date('2023-05-25 19:10:25-07'),
        }),
      ]);

      const res = await articleService.getAllArticles();

      expect(res.length).to.eql(2);
      expect(res[0]).to.eql({
        articleId: 'test-uuid-1',
        title: 'test title',
        perex: 'perex',
        createdAt: new Date('2023-05-25 19:10:25-07'),
        lastUpdatedAt: new Date('2023-05-25 19:10:25-07'),
      });
      expect(res[1]).to.eql({
        articleId: 'test-uuid-2',
        title: 'test title',
        perex: 'perex',
        createdAt: new Date('2023-05-25 19:10:25-07'),
        lastUpdatedAt: new Date('2023-05-25 19:10:25-07'),
      });

      sinon.assert.calledOnce(find);
    });
  });
});
