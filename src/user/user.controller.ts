import { UserService } from './user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserDto } from './user.interface';
import { DeleteResult } from 'typeorm';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/all')
    async getUser(): Promise<UserEntity[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<UserEntity> {
        return await this.userService.findOne(id);
    }

    @ApiBody({
        description: 'Reason Code',
        required: true,
        isArray: false,
        examples: {
            test: {
                summary: 'Пример',
                description: 'Создание пользователя',
                value: { name: 'name', password: 'password' },
                externalValue: 'string',
            },
        },
    })
    @Post('/create')
    async create(@Body() dto: UserDto) {
        return await this.userService.create(dto);
    }

    @ApiBody({
        required: true,
        examples: {
            test: {
                summary: 'Пример',
                description: 'Создание пользователя',
                value: { id: 1, name: 'name', password: 'password' },
                externalValue: 'string',
            },
        },
    })
    @Patch('/edit')
    async edit(@Body() dto: UserEntity) {
        return await this.userService.edit(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.userService.delete(id);
    }
}
