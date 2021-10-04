import { Router } from 'express';

import ProductsController from '@modules/products/infra/http/controllers/ProductsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/user/:id', productsController.indexByUser);
productsRouter.get('/:id', productsController.indexById);
productsRouter.use(ensureAuthenticated);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
