import { HttpException } from '@nestjs/common';
import { Args, Mutation, Int, Query, Resolver } from '@nestjs/graphql';
import { NewNumbersInput } from './dto/new-numbers-input';
import { Num } from './number.entity';
import { NumberService } from './number.service';

@Resolver(of => Num)
export class NumberResolver {
  constructor(private readonly numberService: NumberService) {}

  @Mutation(returns => [Number])
  async addNumbers(@Args('numbers') newData: NewNumbersInput):Promise<number[]> {
    return await this.numberService.addNumbers(newData);
  }

  @Query(returns => [Number])
  async sortNumbers(@Args('sort') condition: string): Promise<number[] | HttpException> {
    return await this.numberService.sortNumbers(condition);
  }
}