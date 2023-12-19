import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();
        users.forEach((user) => delete user.password);

        return users;
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) delete user.password;
        return user;
    }

    async create(dto: UserDto) {
        return this.userRepository.save(dto);
    }

    async edit(dto: UserEntity) {
        const user = await this.userRepository.findOne({ where: { id: dto.id } });

        user.name = dto.name;
        user.password = dto.password;

        return this.userRepository.save(user);
    }

    async delete(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });

        return await this.userRepository.delete(user);
    }
}
