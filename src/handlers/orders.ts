import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { DashboardQueries } from '../services/dashboard';

import { verifyJWT } from '../middleware/jwttoken';

const store = new OrderStore();
const dashboardStore = new DashboardQueries();

/**
 * List all orders endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const index = async (_req: Request, res: Response) => {
  try {
    const results = await store.index();
    res.json(results);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Show one order endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const show = async (_req: Request, res: Response) => {
  try {
    const order = await store.show(_req.params.id as unknown as number);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Create order endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const create = async (_req: Request, res: Response) => {
  const order: Order = {
    user_id: _req.body.user_id,
    status: _req.body.status
  };

  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Update order endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const update = async (_req: Request, res: Response) => {
  const order: Order = {
    user_id: _req.body.user_id,
    status: _req.body.status
  };

  const id = _req.params.id as unknown as number;

  try {
    const updateOrder = await store.update(id, order);
    res.json(updateOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Add product to order endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const addProductToOrder = async (_req: Request, res: Response) => {
  const data = {
    order_id: _req.params.order_id as unknown as number,
    product_id: _req.params.product_id as unknown as number,
    quantity: _req.body.quantity as unknown as number
  };

  try {
    const addedProduct = await dashboardStore.addProductToOrder(
      data.order_id,
      data.product_id,
      data.quantity
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Update product in order endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const updateProductInOrder = async (_req: Request, res: Response) => {
  const data = {
    order_id: _req.params.order_id as unknown as number,
    product_id: _req.params.product_id as unknown as number,
    quantity: _req.body.quantity as unknown as number
  };

  try {
    const updateOrder = await dashboardStore.updateProductInOrder(
      data.order_id,
      data.product_id,
      data.quantity
    );
    res.json(updateOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Delete product from order endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const deleteProductInOrder = async (_req: Request, res: Response) => {
  const data = {
    order_id: _req.params.order_id as unknown as number,
    product_id: _req.params.product_id as unknown as number
  };

  try {
    await dashboardStore.deleteProductFromOrder(data.order_id, data.product_id);
    res.json(`Removed ${data.product_id} from order ${data.order_id}`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Get products in order endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const getProductsInOrder = async (_req: Request, res: Response) => {
  const id = _req.params.order_id as unknown as number;
  try {
    const results = await dashboardStore.productsInOrder(id);
    res.json(results);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', verifyJWT, index);
  app.post('/orders', verifyJWT, create);
  app.get('/orders/:id', verifyJWT, show);
  app.put('/orders/:id', verifyJWT, update);

  // dashboard queries
  app.get('/orders/:order_id/products', verifyJWT, getProductsInOrder);
  app.post(
    '/orders/:order_id/products/:product_id',
    verifyJWT,
    addProductToOrder
  );
  app.put(
    '/orders/:order_id/products/:product_id',
    verifyJWT,
    updateProductInOrder
  );
  app.delete(
    '/orders/:order_id/products/:product_id',
    verifyJWT,
    deleteProductInOrder
  );
};

export default ordersRoutes;
