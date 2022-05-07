import client from "../database";

export type ProductModel = {
  id?: number;
  uid: string;
  title: string;
  description?: string;
  price: number;
};

export class ProductsStore {
  async destroy(uid?: string): Promise<boolean> {
    if (!uid) {
      return false;
    }
    const sql = "DELETE FROM products WHERE uid=($1)";
    const conn = await client.connect();
    return await conn
      .query(sql, [uid])
      .catch((e) => false)
      .then(() => true)
      .finally(() => conn.release());
  }

  async show(uid?: string): Promise<ProductModel | undefined> {
    if (!uid) {
      return undefined;
    }
    const sql = "SELECT * FROM products WHERE uid=($1)";
    const conn = await client.connect();
    return await conn
      .query(sql, [uid])
      .then((result) => result.rows[0] ?? undefined)
      .catch((e) => undefined)
      .finally(() => conn.release());
  }

  async index(): Promise<ProductModel[] | []> {
    const sql = "SELECT * FROM products";
    const conn = await client.connect();
    return await conn
      .query(sql)
      .then((result) => result.rows ?? [])
      .catch((e) => [])
      .finally(() => conn.release());
  }

  async create(user: ProductModel): Promise<ProductModel | undefined> {
    const sql =
      "INSERT INTO products (uid, title, description, price) VALUES($1, $2, $3, $4) RETURNING *";
    const conn = await client.connect();
    return await conn
      .query(sql, [user.uid, user.title, user.description, user.price])
      .then((result) => result.rows[0] ?? undefined)
      .catch((e) => console.log(e))
      .finally(() => conn.release());
  }
}
