import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create_product.dto';
import slugify from 'slugify';
import { UpdateProductDto } from './dto/update_product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly prodRepo: Repository<Product>) {}

    async findAll(){
        return await this.prodRepo.find();
    }

    async findBySlug(slug: string){
        const product = await this.prodRepo.findOne({where: {slug}, relations:['category']});
        if (!product) throw new NotFoundException (`product ${slug} not found.`);
        return product;
    }

    async findOne(id: number){
        const product = await this.prodRepo.findOne({where: {id}});
        if (!product) throw new NotFoundException ('The product not found.');
        return product;
    }

    async create(dto: CreateProductDto){
        const product = this.prodRepo.create({
            ...dto,
            slug: slugify(dto.name, {lower: true, strict: true}),
            category: {id: dto.categoryId},
        })
        return await this.prodRepo.save(product);
    }

    async update(id: number, dto: UpdateProductDto){
        const product =  await this.findOne(id);
        Object.assign(product, dto);
        if (dto.name) product.slug = slugify(dto.name, {lower: true, strict: true});
        return await this.prodRepo.save(product);
    }

    async remove(id: number){
        const product = await this.findOne(id);
        return await this.prodRepo.remove(product);
    }

    async findByCategory(categoryId: number): Promise<Product[]> {
        return this.prodRepo.find({
            where: { category: { id: categoryId } },
            relations: ['category'],
        });
    }
}
