import Client from '../database';

export type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  status?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users';
      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(data: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        data.username,
        data.first_name,
        data.last_name,
        data.password
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${data.username}. Error: ${err}`);
    }
  }

  async update(id: number, data: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET username=$2, first_name=$3, last_name=$4, password=$5, status=$6 WHERE id=$1 RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        id,
        data.username,
        data.first_name,
        data.last_name,
        data.password,
        data.status
      ]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not update user ${data.username}. Error: ${err}`);
    }
  }

  async delete(id: number) {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);
      console.log('PRUT!!!!', result);
      conn.release();
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
