import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: Product): Promise<Product>;
  findByTag(tag: string): Promise<Product[]>;
  findByName(name: string): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByUserId(id: string): Promise<Product[]>;
  remove(id: string): Promise<void>;
}
