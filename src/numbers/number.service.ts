import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewNumbersInput } from "./dto/new-numbers-input";
import { Num } from './number.entity';

@Injectable()
export class NumberService {
    constructor(
        @InjectRepository(Num)
        private numbersRepository: Repository<Num>,
      ) {}

    async generateNumber() {
        const newNumber = await this.numbersRepository.save({value: Math.floor(Math.random() * 10_000_000)});
        return `number ${newNumber.value} added!`;
    }

    async addNumbers(newArray:NewNumbersInput) {
        await this.numbersRepository.save(newArray.array.map( e => {return {value: e}}));
        return newArray.array;
    }

    async sortNumbers(condition: string) {
        let order:'ASC' | 'DESC';

        if (condition === "<") {
            order = 'ASC';
        }else if(condition === ">") {
            order = 'DESC';
        } else {
            return new HttpException(
                    { status: HttpStatus.FORBIDDEN, error: 'USE "<" OR ">" SYMBOLS FOR SORTING NUMBERS.'}
                    , HttpStatus.FORBIDDEN
                );
        }

        const sort = await this.numbersRepository.createQueryBuilder("num").orderBy("value", order).getMany();
        return sort.map( e => e.value);
    }

    async deleteNumbers() {
        await this.numbersRepository.clear();
    }
}