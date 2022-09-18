import Client from '../database';

export type Category = {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
};

export class CategoryStore {
  async index(): Promise<Category[]> {
    try {
      const sql = 'SELECT * FROM categories';
      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get categories. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Category> {
    try {
      const sql = 'SELECT * FROM categories WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find category ${id}. Error: ${err}`);
    }
  }

  async create(data: Category): Promise<Category> {
    try {
      const sql =
        'INSERT INTO categories (name, slug, description) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        data.name,
        data.slug,
        data.description
      ]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not add new category ${data.name}. Error: ${err}`);
    }
  }

  async update(id: number, data: Category): Promise<Category> {
    try {
      const sql =
        'UPDATE categories SET name = $2, slug = $3, description = $4 WHERE id = $1 RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        id,
        data.name,
        data.slug,
        data.description
      ]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not add new category ${data.name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Category> {
    try {
      const sql = 'DELETE FROM categories WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not delete category ${id}. Error: ${err}`);
    }
  }
}
