import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { container, inject, injectable } from 'tsyringe';
import IProductDTO from '../dtos/IProductDTO';
import FormatProductService from './utils/FormatProductsService';

@injectable()
class FindProductByTagNameService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) { }

  async execute(query: string): Promise<IProductDTO[]> {
    const productsByTag = await this.productsRepository.findByTag(query);
    const productsByName = await this.productsRepository.findByName(query);
    
    let allProducts = [...productsByName, ...productsByTag];

    allProducts = allProducts.filter((item, index, self) =>
      index === self.findIndex((product) => (
        product.id === item.id
      ))
    )

    const formatProducts = container.resolve(FormatProductService);

    const formattedProducts = formatProducts.execute(allProducts);

    return formattedProducts;
  }
}

export default FindProductByTagNameService;
