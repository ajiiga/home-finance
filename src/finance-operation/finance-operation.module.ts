import { Module } from '@nestjs/common';
import { FinanceOperationService } from './finance-operation.service';
import { FinanceOperationController } from './finance-operation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceOperationEntity } from './finance-operation.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { OperationTypeEntity } from '../operationType/operationType.entity';
import { OperationTypeService } from '../operationType/operation-type.service';

@Module({
    imports: [TypeOrmModule.forFeature([FinanceOperationEntity, UserEntity, OperationTypeEntity])],
    providers: [FinanceOperationService, UserService, OperationTypeService],
    controllers: [FinanceOperationController],
})
export class FinanceOperationModule {}
