import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {
    IsDecimal,
    IsString,
    IsInt,
    IsOptional,
    IsNumber
  } from 'class-validator'

@Entity()
export class Roster {
    @PrimaryGeneratedColumn()
    @IsOptional()
    id: number;

    @Column()
    @IsString()
    artist: string;

    @Column("decimal", { precision: 8, scale: 5 })
    @IsNumber()
    rate: number;

    @Column()
    @IsInt()
    streams: number;
}
