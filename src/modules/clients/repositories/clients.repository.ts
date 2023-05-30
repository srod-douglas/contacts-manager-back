import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../entities/client.entity';

export abstract class ClientsRepository {
    abstract create(data: CreateClientDto): Promise<Client> | Client;
    abstract findAll(): Promise<Client[]> | Client[];
    abstract findOne(id: number): Promise<Client | undefined> | Client | undefined;
    abstract findByEmail(email: string): Promise<Client | undefined> | Client | undefined;
    abstract update(id: number, data: UpdateClientDto): Promise<Client> | Client;
    abstract delete(id: number): Promise<void> | void;
}