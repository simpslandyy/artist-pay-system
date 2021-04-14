import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import {
    IsString,
    IsInt,
    IsOptional,
    IsNumber,
    IsDate,
    IsBoolean
  } from 'class-validator'

@Entity()
export class Roster {
    @PrimaryGeneratedColumn()
    @IsOptional()
    id: number;

    @Column({ nullable: false })
    @IsString()
    artist: string;

    @Column("decimal", { precision: 8, scale: 5, nullable: false})
    @IsNumber()
    rate: number;

    @Column({ nullable: false })
    @IsNumber()
    streams: number;

    @Column({ default: false })
    @IsBoolean()
    paid: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @IsDate()
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    @IsDate()
    deletedAt: Date;
}
