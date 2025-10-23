import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {Todo} from "./todos/todos.entity";
import {TodosModule} from "./todos/todos.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ["../.env"],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DB_HOST"),
                port: configService.get("DB_PORT"),
                username: configService.get("DB_USER"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_NAME"),
                entities: [Todo],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        TodosModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
