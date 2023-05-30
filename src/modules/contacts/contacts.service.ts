import { Client } from '@prisma/client';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto, clientId: number) {
    const verifyContactExists = await this.contactsRepository.findByEmail(
      createContactDto.email,
    );

    if (verifyContactExists)
      throw new ConflictException('Contact already belongs to a customer.');
    return this.contactsRepository.create(createContactDto, clientId);
  }

  async findAll(client_id: number) {
    return await this.contactsRepository.findAll(client_id)
  }

  async findOne(id: number, client: Client) {
    const ensureClient = await this.contactsRepository.findOne(id, client)
    if (!ensureClient) throw new NotFoundException('Contact not found.')
    return ensureClient
  }

  async generatePdf(client_id: number): Promise<Uint8Array>{
    const contactsList = await this.contactsRepository.findAll(+client_id)

    const filePdf: PDFDocument = await PDFDocument.create()
    const page: PDFPage = filePdf.addPage()
  
    const fontTimes: PDFFont = await filePdf.embedFont(StandardFonts.TimesRoman)
    const fontSize: number[] = [18, 30]
  
    const { width, height } = page.getSize()

    page.drawText('Relatório de Contatos', {
      x: page.getWidth() / 4,
      y: height - 4 * fontSize[0],
      size: fontSize[1],
      font: fontTimes,
      color: rgb(0,0,0),
    })

    let y: number = page.getHeight() - 100;
  
    contactsList.forEach((contact): void => {

      y -= 30

      page.drawText(`Nome:  ${contact.first_name}`,{
        x: 50,
        y,
        size: fontSize[0]
      })
      y -= 30

      page.drawText(`Sobrenome: ${contact.last_name}`,{
        x: 50,
        y,
        size: fontSize[0]
      })
      y -= 30

      page.drawText(`Contact ID: ${contact.id}`,{
        x: 50,
        y,
        size: fontSize[0]
      })
      y -= 30

      page.drawText(`Email: ${contact.email}`,{
        x: 50,
        y,
        size: fontSize[0]
      })
      y -= 30

      page.drawText(`Telefone: ${contact.phone}`,{
        x: 50,
        y,
        size: fontSize[0]
      })

      y -= 20
    })

    const docBytes: Uint8Array = await filePdf.save()
    return docBytes
  }

  async update(id: number, data: UpdateContactDto, client: Client) {
    const contact = await this.contactsRepository.findOne(id, client)
  
    if (!contact) throw new NotFoundException('Contact not found.')
    return this.contactsRepository.update(id, data)
  }

  async delete(id: number, client: Client) {
    const contact = await this.contactsRepository.findOne(id, client)

    if (!contact) throw new NotFoundException('Contact not found.')
    return this.contactsRepository.delete(id)
  }
}
