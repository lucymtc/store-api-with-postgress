import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../models/category';
// import jwt, { Secret } from 'jsonwebtoken';

const store = new CategoryStore();
// const tokenSecret = process.env.TOKEN_SECRET as Secret;

const index = async (_req: Request, res: Response) => {
  const results = await store.index();
  res.json(results);
};

const show = async (_req: Request, res: Response) => {
  const category = await store.show(_req.params.id as unknown as number);
  res.json(category);
};

const create = async (_req: Request, res: Response) => {
  res.json('CREATE');
};

const update = async (_req: Request, res: Response) => {
  res.json('UPDATE');
};

const remove = async (_req: Request, res: Response) => {
  res.json('DESTROY');
};

const categoriesRoutes = (app: express.Application) => {
  app.get('/categories', index);
  app.post('/categories', create);
  app.get('/categories/:id', show);
  app.put('/categories/:id', update);
  app.delete('/categories/:id', remove);
};

export default categoriesRoutes;
