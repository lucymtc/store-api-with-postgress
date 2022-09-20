import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../models/category';
import { verifyJWT } from '../middleware/jwttoken';

const store = new CategoryStore();

/**
 * List all categories endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const index = async (_req: Request, res: Response) => {
  const results = await store.index();
  res.json(results);
};

/**
 * Show one category endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const show = async (_req: Request, res: Response) => {
  const category = await store.show(_req.params.id as unknown as number);
  res.json(category);
};

/**
 * Create category endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const create = async (_req: Request, res: Response) => {
  const category: Category = {
    name: _req.body.name,
    slug: _req.body.slug,
    description: _req.body.description
  };

  try {
    const newCategory = await store.create(category);
    res.json(newCategory);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Update category endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const update = async (_req: Request, res: Response) => {
  const category: Category = {
    name: _req.body.name,
    slug: _req.body.slug,
    description: _req.body.description
  };

  const id = _req.params.id as unknown as number;

  try {
    const newCategory = await store.update(id, category);
    res.json(newCategory);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (_req: Request, res: Response) => {
  await store.delete(_req.params.id as unknown as number);
  res.json(`Category removed ${_req.params.id}`);
};

const categoriesRoutes = (app: express.Application) => {
  app.get('/categories', index);
  app.post('/categories', verifyJWT, create);
  app.get('/categories/:id', show);
  app.put('/categories/:id', verifyJWT, update);
  app.delete('/categories/:id', verifyJWT, remove);
};

export default categoriesRoutes;
