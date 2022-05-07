import express, { Request, Response } from "express";
import { OrderModel, OrdersStore } from "../models/order.model";
import httpErrors from "@hapi/boom";
import { ORDER_STATUS } from "../utils/Constants";
import { ProductModel, ProductsStore } from "../models/product.model";
import middleware from "../middleware/index";

const ordersStore = new OrdersStore();
const productsStore = new ProductsStore();

const show = async (request: Request, response: Response, next: Function) => {
  const orderId = request.params.id;
  const order = await ordersStore.show(
    parseInt(orderId),
    response.locals?.userId
  );
  if (!order) {
    return next(httpErrors.notFound(`Order not found!`));
  }
  response.status(200).json(order);
};

const create = async (request: Request, response: Response, next: Function) => {
  const products =
    (request.body.products as { uid: string; quantity: number }[]) ?? [];
  if (!products.length) {
    return next(httpErrors.badData(`Products required!`));
  }

  // validate products existence
  const uids = products.map((p) => p.uid);
  const productsPromises: Promise<ProductModel | undefined>[] = [];
  uids.forEach((uid) => {
    productsPromises.push(productsStore.show(uid));
  });
  const productsModels = await (
    await Promise.all(productsPromises)
  ).filter((p) => p !== undefined);
  if (productsModels.length !== products.length) {
    return next(httpErrors.badData(`Invalid products Uids.`));
  }

  // check if user already have active order.
  const activeOrder = await (
    await ordersStore.index(response.locals?.userId)
  ).filter((o) => o.status == ORDER_STATUS.ACTIVE);
  let order: OrderModel | undefined = undefined;
  if (activeOrder.length) {
    // append to the active order.
    order = activeOrder[0];
  } else {
    // create new order
    order = await ordersStore.create(
      ORDER_STATUS.ACTIVE,
      response.locals?.userId
    );
    if (!order) {
      return next(httpErrors.badRequest(`Cant create order!.`));
    }
  }

  productsModels.forEach(async (p, index) => {
    await ordersStore.addProductToOrder(
      products[index].quantity,
      order?.id,
      p?.id
    );
  });

  if (order) {
    const newOrder = await ordersStore.show(order?.id, response.locals?.userId);
    response.status(200).json(newOrder);
  } else {
    return next(httpErrors.badRequest(`Cant create order!.`));
  }
};

const index = async (request: Request, response: Response, next: Function) => {
  const orders = await ordersStore.index(response.locals?.userId);
  response.status(200).json(orders);
};

const ordersRoutes = (app: express.Application) => {
  app.get("/orders", middleware.authMiddleware, index);
  app.post("/orders", middleware.authMiddleware, create);
  app.get("/orders/:id", middleware.authMiddleware, show);
};

export default ordersRoutes;
