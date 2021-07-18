import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewNumbersInput {
  @Field(type => [Number])
  array: number[];
}