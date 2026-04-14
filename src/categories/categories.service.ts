import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/database/entities/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create_category.dto';
import slugify from 'slugify';
import { UpdateCategoryDto } from './dto/update_category.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>){}

    async findAll(){
        return this.categoryRepo.find({order: {createdAt: 'DESC'}});
    }

    async findOne(id: number){
        const category = await this.categoryRepo.findOne({where: {id}});
        if (!category) throw new NotFoundException ('The category not found');
        return category;
    }

    async findBySlug(slug: string){
        const category = await this.categoryRepo.findOne({where: {slug}, relations: ['products']});
        if (!category) throw new NotFoundException (`Category ${slug} not found!`);
        return category;
    }

    async create(dto: CreateCategoryDto){
        const category = this.categoryRepo.create({
            ...dto,
            slug: slugify(dto.name, {lower: true, strict: true}),
        })
        return await this.categoryRepo.save(category)
    }

    async update(id: number, dto: UpdateCategoryDto){
        const category = await this.findOne(id);
        Object.assign(category, dto);
        if (dto.name) category.slug = slugify(dto.name, {lower: true, strict: true});
        return await this.categoryRepo.save(category);
    }
    
    async remove(id: number){
        const category = await this.findOne(id);
        return await this.categoryRepo.remove(category);
    }

}
