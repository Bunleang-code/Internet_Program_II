import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateReceipDto } from "./dto/create-receipt.dto";
import { UpdateReceiptDto } from "./dto/update-receipt.dto";



@Controller('receipts')
export class ReceiptsController {
    constructor(private readonly receiptsService: ReceiptsService){}

    @Get()
    findAll(){
        return this.receiptsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.receiptsService.fineOne(id);
    }

    @Post()
    create(@Body() dto: CreateReceipDto) {
        return this.receiptsService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateReceiptDto){
        return this.receiptsService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.receiptsService.remove(id);
    }
    
}
