import {
    Controller,
    Delete,
    Get
} from "@nestjs/common";

import { NumberService } from "./number.service";

@Controller('numbers') 
    export class NumberController {
        constructor (private readonly numberService: NumberService) {}

    @Get()
    async generateNumber() {
        const number = await this.numberService.generateNumber();
        return number;
    }

    @Delete()
    async deleteNumbers() {
        await this.numberService.deleteNumbers();
        return 'Numbers deleted';
    }
} 