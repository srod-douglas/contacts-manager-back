import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
    constructor(private clientsService: ClientsService, private prisma: PrismaService, private jwtService: JwtService) {}

    async validateClient(email: string, password: string){

        const client = await this.prisma.client.findUnique({
            where:{
                email
            }, 
            select: {
                password: true, 
                email: true
            }
        })

        if(client){
            const pwdMatch = await compare(password, client.password)

            if(pwdMatch){
                return { email: client.email }
            }
        }
        return null
    }

    async login(email: string){
        const client = await this.clientsService.findByEmail(email)
        return {
            token: this.jwtService.sign({ email }, { subject: String(client.id) }),
        }
    }
}
