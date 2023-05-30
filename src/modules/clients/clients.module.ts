import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ClientsRepository } from './repositories/clients.repository';
import { ClientsPrismaRepository } from './repositories/prisma/clients.prisma.repository';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, {
    provide: ClientsRepository, useClass: ClientsPrismaRepository
  }],
  exports: [ClientsService, PrismaService],
})
export class ClientsModule {}
