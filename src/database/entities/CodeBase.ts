import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class CodeBase {
    @CreateDateColumn({
        nullable: false,
    })
    created_at?: Date;

    @UpdateDateColumn({
        nullable: false,
    })
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}