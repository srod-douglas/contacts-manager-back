import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Client } from '@prisma/client';
import { Contact } from '../../entities/contact.entity';
import { ContactsRepository } from '../contacts.repository';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
    constructor(private prisma: PrismaService){}

    async create(data: CreateContactDto, clientId: number): Promise<Contact> {
        const contact = new Contact();
        Object.assign(contact, {
            ...data,
        })
        const newContact = await this.prisma.contact.create({
            data: { 
                ...contact, 
                clientId
            },
        })
        return newContact
    }

    async findAll(client_id: number): Promise<Contact[]> {
        const contacts = await this.prisma.contact.findMany({
            where:{
                clientId: client_id
            }
        });
        return contacts
    }

    async findOne(id: number, client: Client): Promise<Contact> {
        const contact = await this.prisma.contact.findUnique({
            where:{ 
                id 
            }
        })
    
        if (!contact || contact.clientId == client.id) return contact
        return null
    }

    async findByEmail(email: string): Promise<Contact> {
        const contact = await this.prisma.contact.findUnique({
            where: { 
                email 
            }
        })
        return plainToInstance(Contact, contact)
    }

    async update(id: number, data: UpdateContactDto): Promise<Contact> {
        const contact = await this.prisma.contact.update({
            where: { 
                id 
            },
            data: { 
                ...data 
            },
        })
        return contact
    }

    async delete(id: number): Promise<void> {
        await this.prisma.contact.delete({
            where: { 
                id 
            },
        });
    }
}