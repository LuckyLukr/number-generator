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

    /**
     * Saves a given number in the database.
     * If number does not exist in the database then inserts, otherwise updates.
     */
    async generateNumber() {
        const newNumber = await this.numbersRepository.save({value: Math.floor(Math.random() * 10_000_000)});
        return `number ${newNumber.value} added!`;
    }

    /**
     * Saves all numbers from given array in the database.
     * If numbers does not exist in the database then inserts, otherwise updates.
     */
    async addNumbers(array:NewNumbersInput) {
        await this.numbersRepository.save(array.array.map( e => {return {value: e}}));
        return array.array;
    }

    /**
     * Returns array of numbers that is managed by this repository.
     * Sets ORDER BY condition in the query builder depending on the given order condition ( < or > ).
     */
    async sortNumbers(condition: string) {
        let order:'ASC' | 'DESC';

        if (condition === "<") {
            order = 'ASC';
        }else if(condition === ">") {
            order = 'DESC';
        } else {
            return new HttpException(
                    { status: HttpStatus.FORBIDDEN, error: 'USE "<" OR ">" SYMBOLS FOR SORTING DATA.'}
                    , HttpStatus.FORBIDDEN
                );
        }

        const sort = await this.numbersRepository.createQueryBuilder("num").orderBy("value", order).getMany();
        return sort.map( e => e.value);
    }

    /**
     * Clears all the data from the given table/collection (truncates/drops it).
     */
    async deleteNumbers() {
        await this.numbersRepository.clear();
    }
}