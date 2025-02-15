import { IsEmail, IsNotEmpty } from "class-validator";

export class TrackReadQueryDto {
    @IsNotEmpty({ message: 'email is required' })
    @IsEmail({}, { message: 'must be a valid email' })
    email: string;

    @IsNotEmpty({ message: 'id is required' })
    id: string;
}