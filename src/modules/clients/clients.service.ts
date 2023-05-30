import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(private clientsRepository: ClientsRepository){}

  async create(createClientDto: CreateClientDto) {
    const verifyUserExists = await this.clientsRepository.findByEmail(createClientDto.email)
  
    if(verifyUserExists) throw new ConflictException('Client already exists.')

    return this.clientsRepository.create(createClientDto)
  }

  findAll() {
    return this.clientsRepository.findAll();
  }

  findClient = (id: number) => this.clientsRepository.findOne(id);

  async findOne(id: number) {
    const client = await this.findClient(id)
  
    if(!client) throw new NotFoundException('Client not found.')
    return client;
  }

  async findByEmail(email: string){
    const client = await this.clientsRepository.findByEmail(email)
  
    if(!client) throw new NotFoundException('Client not found.')
    return client
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.findClient(id)

    if(!client) throw new NotFoundException('Client not found.')
    return this.clientsRepository.update(id, updateClientDto)
  }

  async delete(id: number) {
    const client = await this.findClient(id)

    if(!client) throw new NotFoundException('Client not found.')
    return this.clientsRepository.delete(id)
  }
}
