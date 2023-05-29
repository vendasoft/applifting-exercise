import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {param, post, requestBody} from '@loopback/rest';
import {Comment} from '../models';
import {CommentService} from '../services';

export class CommentController {
  constructor(
    @inject('services.CommentService') private commentService: CommentService,
  ) {}

  @authenticate('jwt')
  @post('comments')
  async addComment(@requestBody() comment: Comment) {
    await this.commentService.addComment(comment);
  }

  @authenticate('jwt')
  @post('comments/{commentId}/vote/up')
  async voteUpComment(
    @param.path.string('commentId') commentId: number,
  ): Promise<Comment> {
    return this.commentService.voteUp(commentId);
  }

  @authenticate('jwt')
  @post('comments/{commentId}/vote/down')
  async voteDownComment(
    @param.path.string('commentId') commentId: number,
  ): Promise<Comment> {
    return this.commentService.voteDown(commentId);
  }
}
