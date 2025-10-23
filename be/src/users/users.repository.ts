import {Injectable} from "@nestjs/common";
import {DataSource, DeleteResult, Repository, UpdateResult} from "typeorm";

import {CreateUserDto, UpdateUserDto} from "./dto";
import {User} from "./users.entity";

@Injectable()
export class UsersRepository {
    constructor(private dataSource: DataSource) {}

    private get repository(): Repository<User> {
        return this.dataSource.getRepository(User);
    }

    async findByEmail(id: string): Promise<User | null> {
        return this.repository.findOne({where: {id}});
    }

    async findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async create(userData: CreateUserDto): Promise<User> {
        const user = this.repository.create(userData);
        return this.repository.save(user);
    }

    async delete(email: string): Promise<DeleteResult> {
        return this.repository.delete({email});
    }

    async update(
        email: string,
        userData: UpdateUserDto,
    ): Promise<UpdateResult> {
        return this.repository.update(email, userData);
    }
}
