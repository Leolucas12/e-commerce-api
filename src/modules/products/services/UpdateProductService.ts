import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';
import IProductDTO from '../dtos/IProductDTO';
import CreateTagService from './CreateTagsService';
import FormatTagService from './utils/FormatTagsService';

interface IRequest {
  id: string;
  name: string;
  price: number;
  inventory: number;
  tags: string[];
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    id,
    name,
    price,
    inventory,
    tags,
  }: IRequest): Promise<IProductDTO> {
    const product = await this.productsRepository.findById(id);
    
    if (!product) throw new AppError('Produto não encontrado', 404);
    
    const createTags = container.resolve(CreateTagService);

    const productTags = await createTags.execute(tags);

    Object.assign(product, {
      name,
      price,
      inventory,
      productTags
    })

    await this.productsRepository.update(product);
    
    const formatTags = container.resolve(FormatTagService);

    const tagValues = formatTags.execute(productTags);

    const productFormatted: IProductDTO = {
      id: product.id,
      name: product.name,
      price: product.price,
      inventory: product.inventory,
      tags: tagValues,
    };

    return productFormatted;
  }
}

export default UpdateProductService;
