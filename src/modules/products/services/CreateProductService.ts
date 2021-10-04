import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { container, inject, injectable } from 'tsyringe';
import IProductDTO from '../dtos/IProductDTO';
import CreateTagService from './CreateTagsService';
import FormatTagService from './utils/FormatTagsService';

interface IRequest {
  name: string;
  price: number;
  inventory: number;
  tags: string[];
  authorId: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    name,
    price,
    inventory,
    tags,
    authorId,
  }: IRequest): Promise<IProductDTO> {
    const createTags = container.resolve(CreateTagService);

    const productTags = await createTags.execute(tags);

    const product = await this.productsRepository.create({
      name,
      price,
      inventory,
      productTags,
      created_by: authorId,
    });

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

export default CreateProductService;
