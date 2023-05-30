import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Response, HttpCode } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuardian } from '../auth/jwt.auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseGuards(JwtAuthGuardian)
  create(@Body() createContactDto: CreateContactDto, @Request() req) {
    return this.contactsService.create(createContactDto, +req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardian)
  findAll(@Request() req) {
    return this.contactsService.findAll(+req.user.id);
  }

  @Get('generate-report')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardian)
  async generatePdf(@Request() req, @Response() res){
    const pdfBuffer: Uint8Array = await this.contactsService.generatePdf(+req.user.id)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=relatorio_contatos.pdf',
      'Content-Length': pdfBuffer.length,
    })
    .end(pdfBuffer)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardian)
  findOne(@Param('id') id: string, @Request() req) {
    return this.contactsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardian)
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto, @Request() req) {
    return this.contactsService.update(+id, updateContactDto, req.user);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardian)
  remove(@Param('id') id: string, @Request() req) {
    return this.contactsService.delete(+id, req.user);
  }
}
