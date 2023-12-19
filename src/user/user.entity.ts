import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';
import { FinanceOperationEntity } from '../finance-operation/finance-operation.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToMany(() => FinanceOperationEntity, (financeOperation) => financeOperation.id, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinTable()
    financeOperations: FinanceOperationEntity[];
}
