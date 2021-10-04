import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { container, inject, injectable } from 'tsyringe';
import IProductDTO from '../dtos/IProductDTO';
import FormatProductService from './utils/FormatProductsService';

@injectable()
class FindAllProducts {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(): Promise<IProductDTO[]> {
    const products = await this.productsRepository.findAll();

    const formatProducts = container.resolve(FormatProductService);

    const formattedProducts = formatProducts.execute(products);

    return formattedProducts;
  }
}

export default FindAllProducts;
