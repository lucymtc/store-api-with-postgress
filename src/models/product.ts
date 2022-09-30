import Client from '../database';

export type Product = {
  id?: number;
  name?: string;
  price?: number;
  short_description?: string;
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

  async show(id: number): Promise<Product> {
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
        'INSERT INTO products (name, price, short_description, category_id) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        data.name,
        data.price,
        data.short_description,
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
        'UPDATE products SET name = $2, price = $3, short_description = $4, category_id = $5 WHERE id = $1 RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        id,
        data.name,
        data.price,
        data.short_description,
        data.category_id
      ]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not update product ${data.name}. Error: ${err}`);
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
