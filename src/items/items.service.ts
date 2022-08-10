import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import axios, { AxiosInstance } from 'axios';
import {
  ItemsResponse,
  ItemByIDInterface,
  ItemDescriptions,
} from './interfaces/';
@Injectable()
export class ItemsService {
  private readonly axios: AxiosInstance = axios;

  async search(search: string) {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${search}`;

    const { data } = await this.axios.get<ItemsResponse>(url);

    const items = data.results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: String(item.price).split('.')[1]
          ? String(item.price).split('.')[1].length
          : 0,
      },
      picture: `https://http2.mlstatic.com/D_${item.thumbnail_id}-O.jpg`,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));

    const categories = data.available_filters.find(
      (item) => item.id == 'category',
    );

    const jsonRes = {
      author: {
        name: 'Jhon',
        lastname: 'Perez',
      },
      categories: categories.values.map((item) => item.name),
      items,
    };
    return jsonRes;
  }

  async findDescription(id: string) {
    const url = `https://api.mercadolibre.com/items/${id}/description`;

    const { data } = await this.axios.get<ItemDescriptions>(url);
    return data.plain_text;
  }

  async findOne(id: string) {
    const url = `https://api.mercadolibre.com/items/${id}`;

    const { data } = await this.axios.get<ItemByIDInterface>(url);

    const jsonRes = {
      author: {
        name: 'Jhon',
        lastname: 'Perez',
      },
      item: {
        id: data.id,
        title: data.title,
        price: {
          currency: data.currency_id,
          aumount: data.price,
          decimals: String(data.price).split('.')[1]
            ? String(data.price).split('.')[1].length
            : 0,
        },
        picture: data.pictures[0].url,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: await this.findDescription(id),
      },
    };
    return jsonRes;
  }
}
