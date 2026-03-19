import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { ClientProxy } from '@nestjs/microservices';
import { timestamp } from 'rxjs';
import { time } from 'console';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,

    @Inject('RABBITMQ_SERVICE')
    private readonly rabbitClient: ClientProxy,
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
    const saved = await this.receiptRepo.save(receipt);

    this.rabbitClient.emit('receipt.created', {
      event: 'receipt.created',
      timestamp: new Date(),
      date: saved,
    });

    return saved;
  }

  async update(id: number, dto: UpdateReceiptDto) {
    const receipt = await this.findOne(id);

    if (dto.issuedAt !== undefined) receipt.issuedAt = new Date(dto.issuedAt);
    if (dto.name !== undefined) receipt.name = dto.name;
    if (dto.price !== undefined) receipt.price = dto.price;

    const updated = await this.receiptRepo.save(receipt);

    this.rabbitClient.emit('receipt.updated', {
      event: 'receipt.updated',
      timestamp: new Date(),
      data: updated,
    });

    return updated;
  }

  async remove(id: number) {
    const receipt = await this.findOne(id);
    await this.receiptRepo.remove(receipt);

    this.rabbitClient.emit('receipt.deleted', {
      event: 'receipt.deleted',
      timestamp: new Date(),
      data: {id},
    });

    return { deleted: true, id };
  }
}