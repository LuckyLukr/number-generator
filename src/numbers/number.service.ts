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
        const newNumber = await this.numbersRepository.save({value: Math.floor(Math.random() * 10_000)});
        return `number ${newNumber.value} added!`;
    }

    async addNumbers(newArray:NewNumbersInput) {
        const existingNumbers = await this.numbersRepository.find();
        const floatNumbers = newArray.array;

        function generateUniqueNumber() {
            const newNumber = Math.floor(Math.random() * 10_000);
          if (existingNumbers.find((e:Num) => e.value === newNumber)) {
              return generateUniqueNumber();
          }
          return newNumber;
        }

        function removeDuplicateNumbers() {
            const updatedNumbers = [];
            floatNumbers.forEach((e:number) => {
               if( existingNumbers.find((i:Num) => e === i.value || e === e) ) {
                    e = generateUniqueNumber();
                    updatedNumbers.push({value: e});
               } else {
                    updatedNumbers.push({value: e});
               }
            })
            return updatedNumbers;
        }

        await this.numbersRepository.insert(removeDuplicateNumbers());
        return removeDuplicateNumbers().map((e:Num) => e.value);
    }

    async sortNumbers(condition:string) {
        const numbers = await this.numbersRepository.find();
        const floats = numbers.map((e:Num) => e.value)
        if (condition === '<') {
            return floats.sort((a, b) => a - b);
        } else if (condition === '>') {
            return floats.sort((a, b) => b - a);
        } else {
            return new HttpException({ status: HttpStatus.FORBIDDEN, error: 'USE "<" OR ">" SYMBOLS FOR SORTING NUMBERS.'
                }, HttpStatus.FORBIDDEN);
        }
    }

    async deleteNumbers() {
        await this.numbersRepository.clear();
    }
}