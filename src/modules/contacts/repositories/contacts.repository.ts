import { Client } from '@prisma/client';
import { Contact } from '../entities/contact.entity';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';

export abstract class ContactsRepository{
    abstract create(data: CreateContactDto, clientId: number): Promise<Contact> | Contact;
    abstract findAll(client_id: number): Promise<Contact[]> | Contact[];
    abstract findOne(id: number, client: Client): Promise<Contact| undefined> | Contact | undefined;
    abstract findByEmail(email: string): Promise<Contact | undefined> | undefined;
    abstract update(id: number, data: UpdateContactDto): Promise<Contact> | undefined;
    abstract delete(id: number): Promise<void> | void;
}