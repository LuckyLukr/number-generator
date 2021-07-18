import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService, NumberResolver],
})
export class AppModule {}
