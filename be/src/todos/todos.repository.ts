import {Injectable} from "@nestjs/common";
import {DataSource, DeleteResult, Repository, UpdateResult} from "typeorm";

import {CreateTodoDto, UpdateTodoDto} from "./dto";
import {Todo} from "./todos.entity";

@Injectable()
export class TodosRepository {
    constructor(private dataSource: DataSource) {}

    private get repository(): Repository<Todo> {
        return this.dataSource.getRepository(Todo);
    }

    async findActiveByAuthorId(authorId: string): Promise<Todo[]> {
        return this.repository.find({where: {isActive: true, authorId}});
    }

    async findAllByAuthorId(authorId: string): Promise<Todo[]> {
        return this.repository.find({where: {authorId}});
    }

    async findById(id: string): Promise<Nullable<Todo>> {
        return this.repository.findOne({where: {id}});
    }

    async create(todoData: CreateTodoDto): Promise<Todo> {
        const todo = this.repository.create(todoData);
        return this.repository.save(todo);
    }
    async delete(id: string): Promise<DeleteResult> {
        return this.repository.delete({id});
    }
    async update(id: string, todoData: UpdateTodoDto): Promise<UpdateResult> {
        return this.repository.update(id, todoData);
    }
}
