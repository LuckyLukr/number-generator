import { Injectable, ForbiddenException } from "@nestjs/common";
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
        const newNumber = await this.numbersRepository.save({value: Math.floor(Math.random() * 10_000)});
        return `number ${newNumber.value} added!`;
    }

    async addNumbers() {
        const existingNumbers = await this.numbersRepository.find();

        function generateUniqueNumber(existingNumbers:Num[]) {
            const newNumber = Math.floor(Math.random() * 10000);
          if (existingNumbers.find((e:Num) => e.value === newNumber)) {
              return generateUniqueNumber(existingNumbers);
          }
          return newNumber;
        }

        const newNumbers = [
            {value: generateUniqueNumber(existingNumbers)}, 
            {value: generateUniqueNumber(existingNumbers)},
            {value: generateUniqueNumber(existingNumbers)}
        ];

        await this.numbersRepository.insert(newNumbers);
        return newNumbers.map((e:Num) => e.value);
    }

    async sortNumbers(condition:string) {
        const numbers = await this.numbersRepository.find();
        const floats = numbers.map((e:Num) => e.value)
        if (condition === '<') {
            return floats.sort((a, b) => a - b);
        } else if (condition === '>') {
            return floats.sort((a, b) => b - a);
        } else {
            return
        }
    }

    async deleteNumbers() {
        await this.numbersRepository.clear();
    }
}