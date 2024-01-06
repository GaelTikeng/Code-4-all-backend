import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.models';
import { CreateReviewDto } from './dto/review.createDto';
import { UpdateReviewDto } from './dto/review.updateDto';
import { User } from 'src/users/model/user.model';
import { CodeService } from 'src/code/code.service';
import { UpdateCodeDto } from 'src/code/dto/code.updateDto';
import { Reviews } from './inteface/review.interface';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review,
    private codeService: CodeService
  ) { }

  //FIND ALL REVIEW
  async findAll(): Promise<Review[]> {
    const allRev: Review[] = await this.reviewModel.findAll({
      include: [{
        model: User,
      }]
    })
    // const allReview = allRev.map((rev) => {

    // })
    return allRev
  }

  // CREATE NEW REVIEW

  async createNewReview(reviewDto: Reviews): Promise<Review> {
    try {
      console.log('this is rating', reviewDto.rating, "this is codeId", reviewDto.code_id)
      const rating = reviewDto
      // update code with rating
      // const updatedCode = await this.codeService.insertRating(reviewDto.code_id, reviewDto.rating)

      return await this.reviewModel.create({ ...reviewDto })
    }
    catch(err) {
      console.log(err)
    }
  }

  // UPDATE A REVIEW
  async updateReview(
    review_id: string,
    userId: string,
    updateDto: UpdateReviewDto,
  ): Promise<any> {
    return await this.reviewModel.update(updateDto, {
      where: { id: review_id, user_id: userId }
    })
  }

  // DELETE A REVIEW
  async deleteRevById(id: string, user_id: string): Promise<any> {
    console.log('id', id)
    console.log('userId', user_id)
    return await this.reviewModel.destroy({
      where: {
        id: id,
        user_id: user_id
      }
    })
  }

  // GET REVIEW PER CODEID
  async getReviewPerCodeId(id: string): Promise<Review[]> {
    return await this.reviewModel.findAll({
      where: {
        code_id: id
      },
      include: {
        model: User
      }
    })
  }

}
