import { Entity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';   

@Entity()
@ObjectType()
export class Num {
  @PrimaryColumn()
  @Field()
  value: number;
}