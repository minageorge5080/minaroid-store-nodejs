import client from "../database";

export type ProductModel = {
  id?: number;
  uid: string;
  title: string;
  description?: string;
  price: number;
};

export class ProductsStore {
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
}
