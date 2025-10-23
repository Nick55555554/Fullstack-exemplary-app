import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
    MinLength,
} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}

export class UpdateUserDto extends CreateUserDto {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
