import Client from '../database';

export type Product = {
  id?: number;
  name?: string;
  price?: number;
  category_id?: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(data: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        data.name,
        data.price,
        data.category_id
      ]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${data.name}. Error: ${err}`);
    }
  }

  async update(id: number, data: Product): Promise<Product> {
    try {
      const sql =
        'UPDATE products SET name = $2, price = $3, category_id = $4 WHERE id = $1 RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        id,
        data.name,
        data.price,
        data.category_id
      ]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not add new product ${data.name}. Error: ${err}`);
    }
  }

  async delete(id: number) {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await Client.connect();

      await conn.query(sql, [id]);

      conn.release();
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}