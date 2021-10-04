import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import FindProductByTagNameService from '@modules/products/services/FindProductByTagNameService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import AppError from '@shared/errors/AppError';
import FindAllProducts from '@modules/products/services/FindAllProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import IProductDTO from '@modules/products/dtos/IProductDTO';
import FindProductsByUserService from '@modules/products/services/FindProductsByUserService';
import FindProductByIdService from '@modules/products/services/FindProductByIdService';

export default class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, inventory, tags } = req.body;
    const authorId = req.user.id;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({ name, price, inventory, tags, authorId });

    return res.json(product);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { tag } = req.query;

    if (tag === undefined) {
      const findProducts = container.resolve(FindAllProducts);

      const products = await findProducts.execute();

      return res.json(products)
    }

    const findProducts = container.resolve(FindProductByTagNameService);

    const products = await findProducts.execute(tag as string);

    return res.json(products);
  }

  public async indexByUser(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id;

    const findProducts = container.resolve(FindProductsByUserService);

    const products = await findProducts.execute(userId);

    return res.json(products);
  }

  public async indexById(req: Request, res: Response): Promise<Response> {
    const productId = req.params.id;

    const findProduct = container.resolve(FindProductByIdService);

    const product = await findProduct.execute(productId);

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const productId = req.params.id;
    const { name, price, inventory, tags } = req.body;

    if (productId === undefined)
      throw new AppError('Id do Produto não informado.');

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({ id: productId, name, price, inventory, tags });

    return res.json(product)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const productId = req.params.id;

    if (productId === undefined)
      throw new AppError('Id do Produto não informado.');

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute(productId);

    return res.json('Produto excluído com sucesso');
  }
}
