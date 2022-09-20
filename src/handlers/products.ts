import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyJWT } from '../middleware/jwttoken';

const store = new ProductStore();

/**
 * List all products endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const index = async (_req: Request, res: Response) => {
  const results = await store.index();
  res.json(results);
};

/**
 * Show one product endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const show = async (_req: Request, res: Response) => {
  const product = await store.show(_req.params.id as unknown as number);
  res.json(product);
};

/**
 * Create product endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const create = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price,
    category_id: _req.body.category_id
  };

  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Update product endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const update = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price,
    category_id: _req.body.category_id
  };

  const id = _req.params.id as unknown as number;

  try {
    const newProduct = await store.update(id, product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productsRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.post('/products', verifyJWT, create);
  app.get('/products/:id', show);
  app.put('/products/:id', verifyJWT, update);
};

export default productsRoutes;
