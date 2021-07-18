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
    const numbers = await this.numberService.addNumbers();
    return numbers;
  }
}