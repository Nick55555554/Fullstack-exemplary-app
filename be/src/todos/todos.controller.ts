import {Body, Controller, Get, Param, Patch, Post} from "@nestjs/common";

import type {CreateTodoDto, UpdateTodoDto} from "./dto";
import {TodosService} from "./todos.service";

@Controller("todos")
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    async create(@Body() createTodo: CreateTodoDto) {
        return await this.todosService.create(createTodo);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.todosService.findOne(id);
    }
    @Patch(":id")
    async completeTodo(@Param("id") id: string) {
        return this.todosService.completeTodo(id);
    }
    @Patch(":id")
    async update(@Param("id") id: string, updateTodo: UpdateTodoDto) {
        return this.todosService.update(id, updateTodo);
    }

    @Get("author/authorId")
    getAllTodosByAuthorId(@Param("authorId") authorId: string) {}
}
