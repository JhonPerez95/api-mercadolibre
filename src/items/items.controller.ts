import { Controller, Get, Param, Query, Logger } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(
    // Depencency injection
    private readonly itemsService: ItemsService,
  ) {}

  @Get()
  get(@Query('search') search: string) {
    Logger.debug(search, 'GET');
    return this.itemsService.search(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    Logger.debug(id, 'GET[id]');

    return this.itemsService.findOne(id);
  }
}
