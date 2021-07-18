import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Num } from './number.entity';
import { NumberService } from './number.service';

@Resolver(of => Num)
export class NumberResolver {
  constructor(private readonly numberService: NumberService) {}

  @Query(returns => [Num])
  async numbers(): Promise<Num[]>{
      return await this.numberService.generateNumber();
  }

  @Mutation(returns => [Num])
  async addNumbers(): Promise<Num[]> {
    return await this.numberService.addNumbers();
  }

  @Query(returns => [Num])
  async sortByHighest(): Promise<Num[]> {
    return await this.numberService.sortByHighest();
  }

  @Query(returns => [Num])
  async sortByLowest(): Promise<Num[]> {
    return await this.numberService.sortByLowest();
  }
}