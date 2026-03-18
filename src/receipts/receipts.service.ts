import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
  ) {}

  async findAll() {
    return this.receiptRepo.find({ order: { issuedAt: 'DESC' } });
  }

  async findOne(id: number) {
    const receipt = await this.receiptRepo.findOne({ where: { id } });
    if (!receipt) throw new NotFoundException('Receipt not found');
    return receipt;
  }

  async create(dto: CreateReceiptDto) {
    const receipt = this.receiptRepo.create({
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt): new Date(),
      name: dto.name,
      price: dto.price,
    });
    return this.receiptRepo.save(receipt);
  }

  async update(id: number, dto: UpdateReceiptDto) {
    const receipt = await this.findOne(id);

    if (dto.issuedAt !== undefined) receipt.issuedAt = new Date(dto.issuedAt);
    if (dto.name !== undefined) receipt.name = dto.name;
    if (dto.price !== undefined) receipt.price = dto.price;

    return this.receiptRepo.save(receipt);
  }

  async remove(id: number) {
    const receipt = await this.findOne(id);
    await this.receiptRepo.remove(receipt);
    return { deleted: true, id };
  }
}