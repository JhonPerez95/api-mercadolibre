import { Injectable, NotFoundException } from '@nestjs/common';

import {
  ItemsResponse,
  ItemByIDInterface,
  ItemDescriptions,
} from './interfaces/';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
@Injectable()
export class ItemsService {
  constructor(private readonly http: AxiosAdapter) {}

  async search(search: string) {
    if (!search) throw new NotFoundException('Search not found');
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${search}`;

    const data = await this.http.get<ItemsResponse>(url);

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
      addres: item.address.state_name,
    }));

    const categories = data?.filters[0]?.values[0]?.path_from_root.map(
      (item) => item.name,
    );

    return {
      author: {
        name: 'Jhon',
        lastname: 'Perez',
      },
      categories: categories ?? [],
      items,
    };
  }

  async findDescription(id: string) {
    const url = `https://api.mercadolibre.com/items/${id}/description`;
    const { plain_text } = await this.http.get<ItemDescriptions>(url);
    return plain_text;
  }

  async findOne(id: string) {
    const url = `https://api.mercadolibre.com/items/${id}`;

    const data = await this.http.get<ItemByIDInterface>(url);

    return {
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
  }
}
