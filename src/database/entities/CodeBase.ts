import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class CodeBase {
    @CreateDateColumn({
        name: 'created_at',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt?: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}