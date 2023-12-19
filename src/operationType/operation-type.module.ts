import { Module } from '@nestjs/common';
import { OperationTypeService } from './operation-type.service';
import { OperationTypeController } from './operation-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationTypeEntity } from './operationType.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OperationTypeEntity])],
    providers: [OperationTypeService],
    controllers: [OperationTypeController],
})
export class OperationTypeModule {}
