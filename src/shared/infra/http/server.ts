import 'reflect-metadata';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';
import docs from './swagger.json';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.APP_PORT!}`);
});
