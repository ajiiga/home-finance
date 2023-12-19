import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OperationTypeService } from './operation-type.service';
import { OperationTypeEntity } from './operationType.entity';

@ApiTags('operation type')
@Controller('operation-type')
export class OperationTypeController {
    constructor(private service: OperationTypeService) {}

    @Get('/all')
    async getAll(): Promise<OperationTypeEntity[]> {
        return await this.service.getAll();
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @ApiBody({
        description: 'Reason Code',
        required: true,
        isArray: false,
        examples: {
            test: {
                summary: 'Пример',
                description: 'Создание типа операции',
                value: { name: 'name' },
                externalValue: 'string',
            },
        },
    })
    @Post('/create')
    async create(@Body() dto: { name: string }) {
        return await this.service.create(dto);
    }

    @ApiBody({
        required: true,
        examples: {
            test: {
                summary: 'Пример',
                description: 'Редактирование типа операции',
                value: { id: 1, name: 'name' },
                externalValue: 'string',
            },
        },
    })
    @Patch('/edit')
    async edit(@Body() dto: OperationTypeEntity) {
        return await this.service.edit(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.service.delete(id);
    }
}
