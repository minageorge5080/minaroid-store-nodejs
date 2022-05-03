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
  
  async changeOrderStatus(
    newStatus: ORDER_STATUS,
    id?: number,
    userId?: number
  ): Promise<OrderModel | undefined> {
    const conn = await client.connect();

    const ordrsSql =
      "UPDATE orders SET status=($1) WHERE id=($2) and user_id=($3) RETURNING *;";
    return await conn
      .query(ordrsSql, [newStatus, id, userId])
      .then((res) => res.rows[0 ?? undefined])
      .finally(() => conn.release())
      .catch((e) => undefined);
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

  async indexByStatus(
    status: ORDER_STATUS,
    usrId?: number
  ): Promise<OrderModel[] | []> {
    const conn = await client.connect();
    try {
      const ordrsSql =
        "SELECT * FROM orders WHERE user_id=($1) and status=($2);";
      const ordrProductsSql =
        "SELECT title, uid, description, price, quantity FROM products INNER JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id=($1);";

      const orders =
        (await (await conn.query(ordrsSql, [usrId, status])).rows) ?? [];

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
