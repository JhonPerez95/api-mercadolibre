import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  search(search: string) {
    return `This action returns items ${search}`;


    var config = {
      method: 'get',
      url: `https://api.mercadolibre.com/sites/MLA/search?q=${search}`,
      headers: {},
    };

  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }
}
