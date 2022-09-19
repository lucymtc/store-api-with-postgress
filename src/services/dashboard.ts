import Client from '../database';
import { Product } from '../models/product';

type ProductInOrder = Product & { quantity: number };

export class DashboardQueries {
  async usersWithOrders(): Promise<
    { id: number; first_name: string; last_name: string }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT users.id, first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id GROUP BY users.id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }

  async addProductToOrder(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<{ order_id: number; product_id: number; quantity: number }> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [order_id, product_id, quantity]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `unable add product to the given order ID ${order_id}: ${err}`
      );
    }
  }

  async deleteProductFromOrder(order_id: number, product_id: number) {
    try {
      const conn = await Client.connect();
      const sql =
        'DELETE FROM orders_products WHERE order_id = $1 AND product_id = $2';

      await conn.query(sql, [order_id, product_id]);
      conn.release();
    } catch (err) {
      throw new Error(
        `unable delete product in the given order ID ${order_id}: ${err}`
      );
    }
  }

  async updateProductIdOrder(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<{ order_id: number; product_id: number; quantity: number }> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE orders_products SET quantity = $3 WHERE order_id = $1 AND product_id = $2 RETURNING *';

      const result = await conn.query(sql, [order_id, product_id, quantity]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `unable update product in the given order ID ${order_id}: ${err}`
      );
    }
  }

  async productsInOrder(order_id: number): Promise<ProductInOrder[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT products.id, products.name, products.price, orders_products.quantity FROM orders_products INNER JOIN products ON orders_products.product_id = products.id  WHERE orders_products.order_id = $1';

      const result = await conn.query(sql, [order_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `unable get products for a the given order ID ${order_id}: ${err}`
      );
    }
  }
}
