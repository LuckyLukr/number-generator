import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NumberService } from '../src/numbers/number.service';
import { NumberModule } from '../src/numbers/number.module';
import { Num } from '../src/numbers/number.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NumberController } from '../src/numbers/number.controller';

describe('NumberController (e2e)', () => {
  let app: INestApplication;
  let numberService = { generateNumber: () => [Num]};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        NumberModule,
        TypeOrmModule.forFeature([Num])
      ]
    })
      .overrideProvider(NumberService)
      .useValue(NumberService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET numbers`, () => {
    return request(app.getHttpServer())
      .get('/numbers')
      .expect(200)
      .expect({
        data: numberService.generateNumber(),
      });
  });
});
