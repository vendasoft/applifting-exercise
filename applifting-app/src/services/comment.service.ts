import {/* inject, */ BindingScope, inject, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {Comment} from '../models';
import {CommentRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CommentService {
  constructor(
    @inject('repositories.CommentRepository')
    private commentRepository: CommentRepository,
  ) {}

  async addComment(comment: Comment): Promise<Comment> {
    return this.commentRepository.create(comment);
  }

  async voteUp(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw HttpErrors[404];
    }
    comment.score += 1;
    await this.commentRepository.update(comment);
    return comment;
  }

  async voteDown(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw HttpErrors[404];
    }

    if (comment.score > 0) {
      comment.score += 1;
    }

    await this.commentRepository.update(comment);
    return comment;
  }
}
