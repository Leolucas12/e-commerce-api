import Product from '@modules/products/infra/typeorm/entities/Product';
import { container, injectable } from 'tsyringe';
import IProductDTO from '../../dtos/IProductDTO';
import FormatTagService from './FormatTagsService';

@injectable()
class FormatProductService {
  constructor(
  ) { }

  async execute(products: Product[]): Promise<IProductDTO[]> {
    const formatTags = container.resolve(FormatTagService);

    const formattedProducts: IProductDTO[] = [];

    for (let i = 0; i < products.length; i++) {
      const tags = formatTags.execute(products[i].tags);

      const newProduct: IProductDTO = {
        id: products[i].id,
        name: products[i].name,
        price: products[i].price,
        inventory: products[i].inventory,
        tags,
      };

      formattedProducts.push(newProduct);
    }

    return formattedProducts;
  }
}

export default FormatProductService;
