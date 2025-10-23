import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

import {CreateUserDto, UpdateUserDto} from "./dto";
import {User} from "./users.entity";
import {UsersRepository} from "./users.repository";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: UsersRepository,
    ) {}

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException("User not found!");
        }
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findByEmail(
            createUserDto.email,
        );
        if (existingUser) {
            throw new ConflictException("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const userData = {
            ...createUserDto,
            password: hashedPassword,
        };

        return await this.usersRepository.create(userData);
    }

    async delete(email: string): Promise<void> {
        await this.findByEmail(email);

        await this.usersRepository.delete(email);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.findAll();
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersRepository.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    async changePassword(id: string, updateData: UpdateUserDto): Promise<void> {
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
        await this.usersRepository.update(id, {password: hashedPassword});
    }
}
