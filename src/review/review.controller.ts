import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './models/review.models';
import { CreateReviewDto } from './dto/review.createDto';
import { UpdateReviewDto } from './dto/review.updateDto';
import { ReviewModule } from './review.module';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) { }

  // GET ALL REVIEWS
  @Get()
  async getAllReviews(): Promise<Review[]> {
    return await this.reviewService.findAll()
  }

  //  CREATE NEW REVIEW
  @Post()
  async createReview(@Body() reviewPayload: CreateReviewDto): Promise<any> {
    return await this.reviewService.createNewReview(reviewPayload)
  }

  // UPDATE REVIEW
  @Put(':id/:userId')
  async updateReview(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateRev: UpdateReviewDto): Promise<Review> {
    return await this.reviewService.updateReview(id, userId, updateRev)
  }

  // DELATE REVIEW
  @Delete(':id/:userId')
  async deleteRev(
    @Param('id') id: string,
    @Param('userId') userId: string
  ): Promise<Review> {
    return this.reviewService.deleteRevById(id, userId)
  }

  // GET ALL REVIEWS PER CODEID
  @Get(':codeId')
  async findReviewByCodeId (
    @Param('codeId') codeId: string
  ): Promise<Review[]> {
    return this.reviewService.getReviewPerCodeId(codeId)
  }
}