import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.models';
import { CreateReviewDto } from './dto/review.createDto';
import { UpdateReviewDto } from './dto/review.updateDto';
import { User } from 'src/users/model/user.model';
import { CodeService } from 'src/code/code.service';
import { UpdateCodeDto } from 'src/code/dto/code.updateDto';
import { Reviews } from './inteface/review.interface';
import { Code } from 'src/code/model/code.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review,
    private codeService: CodeService,
    // private codeModel: typeof Code
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

  async createNewReview(reviewDto: CreateReviewDto): Promise<any> {
    try {
      console.log('this is rating', reviewDto.rating, "this is codeId", reviewDto.code_id)
      const returnedObj = this.reviewModel.create({ ...reviewDto })
      // update code with rating
      const currentCode = await this.codeService.findSingleCode(reviewDto.code_id)
      const updatedCode = await this.codeService.insertRating(reviewDto.code_id, {
        rating: reviewDto.rating,
        title: currentCode.title,
        description: currentCode.description,
        price: currentCode.price,
        code_file: currentCode.code_file,
        Programming_language: currentCode.programming_language,
        category: currentCode.category,
        thumbnail: currentCode.thumbnail
      })

      return await updatedCode
    }
    catch (err) {
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
