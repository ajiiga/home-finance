import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FinanceOperationService } from './finance-operation.service';
import { FinanceOperationCreateDto } from './finance-operation.interface';

@ApiTags('finance operation')
@Controller('finance-operation')
export class FinanceOperationController {
    constructor(private service: FinanceOperationService) {}

    @Get('')
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return await this.service.get(id);
    }

    @Get('/user/:userId')
    async getByUser(@Param('userId') userId: number) {
        return await this.service.getByUserId(userId);
    }

    @Get('/operation-type/:operationTypeId')
    async getByOperationType(@Param('operationTypeId') operationTypeId: number) {
        return await this.service.getByOperationTypeId(operationTypeId);
    }

    @ApiBody({
        description: 'Reason Code',
        required: true,
        isArray: false,
        examples: {
            test: {
                summary: 'Пример',
                description: 'Создание финансовой операции',
                value: { userId: 1, operationTypeId: 1, sum: 1000 },
                externalValue: 'string',
            },
        },
    })
    @Post('/create')
    async create(@Body() dto: FinanceOperationCreateDto) {
        return await this.service.create(dto);
    }

    @ApiBody({
        description: 'Reason Code',
        required: true,
        isArray: false,
        examples: {
            test: {
                summary: 'Пример',
                description: 'Редактирование финансовой операции',
                value: { id: 1, userId: 1, operationTypeId: 1, sum: 1000 },
                externalValue: 'string',
            },
        },
    })
    @Patch('/edit')
    async edit(@Body() dto: FinanceOperationCreateDto & { id: number }) {
        return await this.service.edit(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.service.delete(id);
    }
}
