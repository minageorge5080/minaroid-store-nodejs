import express, { Request, Response } from "express";
import { OrdersStore } from "../../models/order.model";
import { UsersStore } from "../../models/user.model";
import httpErrors from "@hapi/boom";
import { ORDER_STATUS } from "../../utils/Constants";

const ordersStore = new OrdersStore();
const userStore = new UsersStore();

const show = async (request: any, response: Response, next: Function) => {
  const userUid = request.uid;
  const orderId = request.params.id;
  const user = await userStore.findUserByUid(userUid);
  if (!user) {
    return next(httpErrors.notFound(`User not found!`));
  }
  const order = await ordersStore.show(orderId, user?.id);
  if (!order) {
    return next(httpErrors.notFound(`Order not found!`));
  }
  response.status(200).json(order);
};

const index = async (request: any, response: Response, next: Function) => {
  const userUid = request.uid;
  const user = await userStore.findUserByUid(userUid);
  if (!user) {
    return next(httpErrors.notFound(`User not found!`));
  }
  const orders = await ordersStore.index(user?.id);
  response.status(200).json(orders);
};

const changeOrderStatus = async (
  request: any,
  response: Response,
  next: Function
) => {
  const userUid = request.uid;
  const orderId = request.params.id;
  const status = request.body.status;
  if (!status) {
    return next(httpErrors.badData(`Status Required!`));
  }

  const user = await userStore.findUserByUid(userUid);
  if (!user) {
    return next(httpErrors.notFound(`User not found!`));
  }

  const validStatus: ORDER_STATUS[] = [
    ORDER_STATUS.OUT_OF_DELEIVERY,
    ORDER_STATUS.PENDING,
    ORDER_STATUS.DELIVERED,
  ];
  if (!validStatus.includes(status)) {
    return next(httpErrors.badRequest(`Invalid status type`));
  }
  const order = await ordersStore.show(orderId, user?.id);
  if (!order) {
    return next(httpErrors.notFound(`Order not found!`));
  }
  if (order.status == status) {
    return next(httpErrors.badRequest(`Order already ${status}`));
  }

  const updatedOrder = await ordersStore.changeOrderStatus(
    status,
    orderId,
    user?.id
  );
  response.status(200).json(updatedOrder);
};

const indexByStatus = async (
  request: any,
  response: Response,
  next: Function
) => {
  const userUid = request.uid;
  const status = request.params.status;

  const user = await userStore.findUserByUid(userUid);
  if (!user) {
    return next(httpErrors.notFound(`User not found!`));
  }
  const orders = await ordersStore.indexByStatus(status, user?.id);
  response.status(200).json(orders);
};

const ordersRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.get("/orders/status/:status", indexByStatus);
  app.post("/orders/status/:id", changeOrderStatus);
};

export default ordersRoutes;
