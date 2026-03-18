import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()  
  issuedAt: Date;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}