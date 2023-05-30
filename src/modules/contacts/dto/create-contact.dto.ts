import { IsString, IsNotEmpty, IsEmail, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
    @ApiProperty({
        example: 'Douglas',
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
    @IsOptional()
    @Length(11)
    phone: string;
}
