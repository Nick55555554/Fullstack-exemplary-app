import {NestFactory} from "@nestjs/core";
import {config} from "dotenv";

import {AppModule} from "./app.module";

config({path: "../.env"});
console.log("Loaded DB_HOST:", process.env.DB_HOST, process.env.DB_PASSWORD);
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
