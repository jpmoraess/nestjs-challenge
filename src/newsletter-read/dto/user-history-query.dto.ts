import { IsEmail, IsNotEmpty } from "class-validator";

export class UserHistoryQueryDto {
    @IsNotEmpty({ message: 'email is required' })
    @IsEmail({}, { message: 'must be a valid email' })
    email: string;
}