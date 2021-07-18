import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NumberController } from "./number.controller";
import { NumberService } from "./number.service";
import { Num } from "./number.entity";
import { NumberResolver } from "./number.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Num])],
    controllers: [NumberController],
    providers: [
        NumberService, 
        NumberResolver,
    ],
    exports: [NumberService]
})
export class NumberModule {}