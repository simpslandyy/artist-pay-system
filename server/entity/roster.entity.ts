import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity()
export class Roster {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    artist: string;

    @Column("decimal", { precision: 8, scale: 5, nullable: false})
    rate: number;

    @Column({ nullable: false })
    streams: number;

    @Column({ default: false })
    paid: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
}
