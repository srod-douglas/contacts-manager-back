import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto{
    @ApiProperty({
        example: 'douglas@mail.com',
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'senha1234',
    })
    @IsString()
    password: string
}