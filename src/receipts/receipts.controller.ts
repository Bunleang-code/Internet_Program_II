import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateReceiptDto } from "./dto/create-receipt.dto";
import { UpdateReceiptDto } from "./dto/update-receipt.dto";
import { ReceiptsService } from "./receipts.service";
@Controller('receipts')
export class ReceiptsController {
    constructor(private readonly receiptsService: ReceiptsService){}

    @Get()
    findAll(){
        return this.receiptsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.receiptsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateReceiptDto) {
        return this.receiptsService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() dto: UpdateReceiptDto){
        return this.receiptsService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        this.receiptsService.remove(id);
        return {Message:'Deteled successfully.'}
    }
}
