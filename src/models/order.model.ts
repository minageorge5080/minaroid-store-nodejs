import client from "../database";
import { ORDER_STATUS } from "../utils/Constants";

export type OrderModel = {
  id?: number;
  status: string;
  products: OrderProduct[];
};

export type OrderProduct = {
  uid: string;
  title: string;
  description?: string;
  price: number;
  quantity: number;
};

export class OrdersStore {
 
  async create(status: ORDER_STATUS, userId?: number): Promise<OrderModel | undefined> {
    const sql =  "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
    const conn = await client.connect();
    return await conn
      .query(sql, [ status,userId ])
      .then((result) => result.rows[0] ?? undefined)
      .catch((e) => undefined)
      .finally(() => conn.release());
  }

  async addProductToOrder(quantity: number, orderId?: number, productId?: number ): Promise<boolean> {
    const sql =  "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
    const conn = await client.connect();
    return await conn
      .query(sql, [ orderId, productId, quantity ])
      .then((res) => true)
      .catch((e) => false)
      .finally(() => conn.release());
  }
  
  async show(id?: number, userId?: number): Promise<OrderModel | undefined> {
    const conn = await client.connect();
    try {
      const ordrsSql = "SELECT * FROM orders WHERE id=($1) and user_id=($2);";
      const ordrProductsSql =
        "SELECT title, uid, description, price, quantity FROM products INNER JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id=($1);";

      const order =
        (await (await conn.query(ordrsSql, [id, userId])).rows[0]) ?? undefined;
      if (!order) {
        return undefined;
      }

      const ordersProducts =
        (await (await conn.query(ordrProductsSql, [order.id])).rows) ?? [];
      const model: OrderModel = {
        id: order.id,
        status: order.status,
        products: ordersProducts.map((p) => {
          return {
            uid: p.uid,
            title: p.title,
            description: p.description,
            price: p.price,
            quantity: p.quantity,
          };
        }),
      };
      return model;
    } catch (e) {
      return undefined;
    } finally {
      conn.release();
    }
  }

  async index(usrId?: number): Promise<OrderModel[] | []> {
    const conn = await client.connect();
    try {
      const ordrsSql = "SELECT * FROM orders WHERE user_id=($1);";
      const ordrProductsSql =
        "SELECT title, uid, description, price, quantity FROM products INNER JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id=($1);";

      const orders = (await (await conn.query(ordrsSql, [usrId])).rows) ?? [];
      const ordersList = await Promise.all(
        orders.map(async (order) => {
          const ordersProducts =
            (await (await conn.query(ordrProductsSql, [order.id])).rows) ?? [];
          const model: OrderModel = {
            id: order.id,
            status: order.status,
            products: ordersProducts.map((p) => {
              return {
                uid: p.uid,
                title: p.title,
                description: p.description,
                price: p.price,
                quantity: p.quantity,
              };
            }),
          };
          return model;
        })
      );
      return ordersList;
    } catch (e) {
      return [];
    } finally {
      conn.release();
    }
  }

}
