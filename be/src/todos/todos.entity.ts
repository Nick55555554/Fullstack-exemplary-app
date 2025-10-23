import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    authorId: string;

    @Column({default: true})
    isActive: boolean;

    @CreateDateColumn()
    updatedAt: string;

    @UpdateDateColumn()
    createdAt: string;
}
