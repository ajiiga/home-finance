import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceOperationEntity } from './finance-operation.entity';
import { UserService } from '../user/user.service';
import { OperationTypeService } from '../operationType/operation-type.service';
import { FinanceOperationCreateDto } from './finance-operation.interface';

@Injectable()
export class FinanceOperationService {
    constructor(
        @InjectRepository(FinanceOperationEntity)
        private readonly repository: Repository<FinanceOperationEntity>,
        private readonly userService: UserService,
        private readonly operationTypeService: OperationTypeService
    ) {}

    async getAll() {
        const operations = await this.repository.find({ relations: ['user', 'operationType'] });

        operations.forEach((operation) => delete operation.user.password);

        return operations;
    }

    async get(id: number) {
        return await this.repository.findOne({ where: { id }, relations: ['user', 'operationType'] });
    }

    async getByUserId(userId: number) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            return [];
        }

        const result = await this.repository.find({ where: { user }, relations: ['user', 'operationType'] });

        result.forEach((operation) => delete operation.user.password);

        return result;
    }

    async getByOperationTypeId(operationTypeId: number) {
        const operationType = await this.operationTypeService.findOne(operationTypeId);
        if (!operationType) {
            return [];
        }

        const result = await this.repository.find({ where: { operationType }, relations: ['user', 'operationType'] });
        result.forEach((operation) => delete operation.user.password);

        return result;
    }

    async create(dto: FinanceOperationCreateDto) {
        const user = await this.userService.findOne(dto.userId);
        const operationType = await this.operationTypeService.findOne(dto.operationTypeId);

        const model: Omit<FinanceOperationEntity, 'id'> = { user, operationType, sum: dto.sum, date: new Date() };

        return await this.repository.save(model);
    }

    async edit(dto: FinanceOperationCreateDto & { id: number }) {
        const user = await this.userService.findOne(dto.userId);
        const operationType = await this.operationTypeService.findOne(dto.operationTypeId);

        const model: FinanceOperationEntity = {
            user,
            operationType,
            sum: dto.sum,
            date: new Date(),
            id: dto.id,
        };

        return await this.repository.save(model);
    }

    async delete(id: number) {
        const financeOperation = await this.repository.findOne({ where: { id } });

        return await this.repository.delete(financeOperation);
    }
}
