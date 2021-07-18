import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NumberModule } from './numbers/number.module';
import { Num } from './numbers/number.entity';
import { NumberResolver } from './numbers/number.resolver';

@Module({
  imports: [
    NumberModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'test',
      database: 'numbers',
      entities: [Num],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [],
  providers: [NumberResolver],
})
export class AppModule {}
