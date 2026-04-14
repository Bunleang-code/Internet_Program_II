import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { ApikeyGuard } from 'src/common/guards/api-key.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@UseGuards(ApikeyGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('products')
export class ProductsController {
    constructor(private readonly prodService: ProductsService) {}

    @Get()
    findAll(){
        return this.prodService.findAll();
    }

    @Get('slug/:slug')
    findBySlug(@Param('slug') slug: string){
        return this.prodService.findBySlug(slug);
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.prodService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateProductDto){
        return this.prodService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id') id:number, 
        @Body() dto: UpdateProductDto,){
        return this.prodService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        this.prodService.remove(id);
        return {message: 'Deleted successfully.'};
    }
}
