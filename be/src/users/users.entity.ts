import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}
