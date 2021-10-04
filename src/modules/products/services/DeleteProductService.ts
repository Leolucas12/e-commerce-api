import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Tag from '../infra/typeorm/entities/Tag';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('O produto informado não existe', 404);

    await this.productsRepository.remove(id);
  }
}

export default DeleteProductService;
