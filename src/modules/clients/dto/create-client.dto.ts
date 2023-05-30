import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
    @ApiProperty({
        example: 'Douglas'
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        example: 'Rodrigues',
        nullable: true,
        required: false
    })
    @IsString()
    @IsOptional()
    last_name: string;

    @ApiProperty({
        example: 'douglas@mail.com',
        uniqueItems: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '99999999999',
        nullable: true,
        required: false
    })
    @IsString()
    @MinLength(11)
    @IsOptional()
    phone: string;

    @ApiProperty({
        example: 'senha1234'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Transform(({ value }: { value: string}) => hashSync(value), {
        groups: ['transform'],
    })
    password: string
}
