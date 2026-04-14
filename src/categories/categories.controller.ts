import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create_category.dto';
import { UpdateCategoryDto } from './dto/update_category.dto';
import { ApikeyGuard } from 'src/common/guards/api-key.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@UseGuards(ApikeyGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}

    @Get()
    findAll(){
        return this.categoryService.findAll();
    }

    @Get('slug/:slug')
    findBySlug(@Param('slug') slug: string){
        return this.categoryService.findBySlug(slug);
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.categoryService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateCategoryDto){
        return this.categoryService.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() dto: UpdateCategoryDto){
        return this.categoryService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number){
       await this.categoryService.remove(id);
        return {message: 'Deleted successfully'};
    }
}
