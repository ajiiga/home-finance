import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OperationTypeEntity } from '../operationType/operationType.entity';

@Entity('finance_operation')
export class FinanceOperationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => OperationTypeEntity, (operationType) => operationType.id, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    operationType: OperationTypeEntity;

    @Column()
    sum: number;

    @Column({ type: 'date' })
    date: Date;
}
