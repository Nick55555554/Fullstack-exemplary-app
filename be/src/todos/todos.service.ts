import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, UpdateResult} from "typeorm";

import {CreateTodoDto, UpdateTodoDto} from "./dto";
import {Todo} from "./todos.entity";
import {TodosRepository} from "./todos.repository";

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: TodosRepository,
    ) {}

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        // const user = await this.usersService.findById(createTodoDto.authorId);
        // if (!user) {
        //     throw new BadRequestException("User not found");
        // }

        // if (user.todosCount >= user.maxTodos) {
        //     throw new ForbiddenException("Todo limit reached");
        // }

        // Создание сущности
        const todo = await this.todosRepository.create(createTodoDto);

        // Доменные события
        // await this.eventEmitter.emitAsync("todo.created", todo);

        return todo;
    }

    async completeTodo(id: string): Promise<UpdateResult> {
        const todo = await this.todosRepository.findById(id);
        if (!todo) {
            throw new NotFoundException("Todo not found");
        }

        if (!todo.isActive) {
            throw new ConflictException("Todo already completed");
        }

        return this.todosRepository.update(id, {isActive: false});
    }

    async delete(id: string): Promise<DeleteResult> {
        const todo = await this.todosRepository.findById(id);
        if (!todo) {
            throw new NotFoundException("Todo not found");
        }

        return this.todosRepository.delete(id);
    }

    async update(
        id: string,
        updatedTodo: UpdateTodoDto,
    ): Promise<UpdateResult> {
        const todo = await this.todosRepository.findById(id);
        if (!todo) {
            throw new NotFoundException("Todo not found");
        }

        return this.todosRepository.update(id, updatedTodo);
    }
    async findOne(id: string): Promise<Todo> {
        const todo = await this.todosRepository.findById(id);
        if (!todo) {
            throw new NotFoundException("Todo not found");
        }

        return todo;
    }

    async findAll(id: string): Promise<Todo[]> {
        const todos = await this.todosRepository.findAllByAuthorId(id);
        if (!todos) {
            throw new NotFoundException("Todos not found");
        }

        return todos;
    }

    async findActive(id: string): Promise<Todo[]> {
        const todos = await this.todosRepository.findActiveByAuthorId(id);
        if (!todos) {
            throw new NotFoundException("Todos not found");
        }

        return todos;
    }
}
