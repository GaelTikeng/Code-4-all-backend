import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './models/review.models';
import { CodeService } from 'src/code/code.service';
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [
    CodeModule,
    SequelizeModule.forFeature([Review])
  ],
  controllers: [ReviewController],
  providers: [ReviewService, CodeService],
  exports: [SequelizeModule]
})
export class ReviewModule {}
