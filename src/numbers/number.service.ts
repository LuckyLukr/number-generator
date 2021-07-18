import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Num } from './number.entity';

@Injectable()
export class NumberService {
    constructor(
        @InjectRepository(Num)
        private numbersRepository: Repository<Num>,
      ) {}

    async generateNumber() {
        const newNumber = {value: Math.floor(Math.random() * 10_000)}
        const numbers = await this.numbersRepository.find();
        await this.numbersRepository.save(newNumber);
        return numbers
    }

    async addNumbers() {
        const newNumbers = [{value: 1},{value: 2},{value: 3},{value: 4},{value: 5}];
        const existingNumbers = await this.numbersRepository.find();
        newNumbers.forEach(e => {
            existingNumbers.forEach( i => {
                if (e.value === i.value){
                    e.value = Math.floor(Math.random() * 10_000);
                }
            })
        })
        await this.numbersRepository.insert(newNumbers);
        return existingNumbers;
    }

    async sortByHighest() {
        const numbers = await this.numbersRepository.find();
        return numbers.sort((a, b) => b.value - a.value);
    }

    async sortByLowest() {
        const numbers = await this.numbersRepository.find();
        return numbers.sort((a, b) => a.value - b.value);
    }

    async deleteNumbers() {
        await this.numbersRepository.clear();
    }
}