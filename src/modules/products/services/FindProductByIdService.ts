import AppError from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import FormatTagService from './utils/FormatTagsService';

@injectable()
class FindProductByIdService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }

    async execute(id: string): Promise<Product | undefined> {
        const product = await this.productsRepository.findById(id);

        if (!product) throw new AppError('O produto informado não existe', 404);

        const formatTags = container.resolve(FormatTagService);
        const tags = formatTags.execute(product?.tags);

        Object.assign(product, {
            tags: tags,
            creator: {
                id: product.creator.id,
                name: product.creator.name,
            }
        })

        return product;
    }
}

export default FindProductByIdService;
