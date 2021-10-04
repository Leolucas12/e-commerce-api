import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { container, inject, injectable } from 'tsyringe';
import IProductDTO from '../dtos/IProductDTO';
import FormatProductService from './utils/FormatProductsService';

@injectable()
class FindProductsByUserService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string): Promise<IProductDTO[]> {
    const productsByUser = await this.productsRepository.findByUserId(id);

    const formatProducts = container.resolve(FormatProductService);

    const formattedProducts = formatProducts.execute(productsByUser);

    return formattedProducts;
  }
}

export default FindProductsByUserService;
