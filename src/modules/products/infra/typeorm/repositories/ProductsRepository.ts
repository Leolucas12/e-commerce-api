import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { getRepository, Like, Repository } from 'typeorm';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.tags', 'tagsTitle')
      .leftJoin('product.tags', 'tags')
      .getMany();

    return products;
  }

  public async findByTag(tag: string): Promise<Product[]> {
    const products = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.tags', 'tagsTitle')
      .leftJoin('product.tags', 'tags')
      .where('tags.title LIKE :tagsTitle', { tagsTitle: `%${tag}%` })
      .getMany();

    return products;
  }

  public async findByName(name: string): Promise<Product[]> {
    const products = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.tags', 'tagsTitle')
      .leftJoin('product.tags', 'tags')
      .where('product.name LIKE :productName', { productName: `%${name}%` })
      .getMany();

    return products;
  }

  public async create({
    name,
    price,
    inventory,
    productTags,
    created_by,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      inventory,
      created_by
    });

    product.tags = productTags;

    await this.ormRepository.save(product);

    return product;
  }

  public async update(product: Product): Promise<Product> {
    return this.ormRepository.save(product)
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.tags', 'tagsTitle')
      .leftJoin('product.tags', 'tags')
      .where('product.id = :productId', { productId: id })
      .getOne();

    return product;
  }

  public async findByUserId(id: string): Promise<Product[]> {
    const products = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.tags', 'tagsTitle')
      .leftJoin('product.tags', 'tags')
      .where('product.created_by = :userId', { userId: id })
      .getMany();

    return products;
  }

  public async remove(id: string): Promise<void> {
    const product = await this.ormRepository.findOne(id);

    if (product) {
      product.tags = [];
      await this.ormRepository.save(product);
    }

    await this.ormRepository.delete(id);
  }
}

export default ProductsRepository;
