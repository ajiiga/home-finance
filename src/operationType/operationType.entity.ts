import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FinanceOperationEntity } from '../finance-operation/finance-operation.entity';

@Entity('operation_type')
export class OperationTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => FinanceOperationEntity, (financeOperation) => financeOperation.id, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinTable()
    financeOperations: FinanceOperationEntity;
}
