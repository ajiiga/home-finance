import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationTypeEntity } from './operationType.entity';

@Injectable()
export class OperationTypeService {
    constructor(
        @InjectRepository(OperationTypeEntity)
        private readonly repository: Repository<OperationTypeEntity>
    ) {}

    async getAll() {
        return this.repository.find();
    }

    async findOne(id: number) {
        return this.repository.findOne({ where: { id } });
    }

    async create(dto: { name: string }) {
        return this.repository.save(dto);
    }

    async edit(dto: OperationTypeEntity) {
        return this.repository.save(dto);
    }

    async delete(id: number) {
        const operationType = await this.repository.findOne({ where: { id } });

        return this.repository.delete(operationType);
    }
}
