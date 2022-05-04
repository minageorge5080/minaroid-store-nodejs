import express, { Request, Response } from "express";
import { ProductModel, ProductsStore } from "../models/product.model";
import httpErrors from "@hapi/boom";
import { generateNanoid } from "../utils";
import { Constants } from "../utils/Constants";
import { UsersStore } from "../models/user.model";

const store = new ProductsStore();
const userStore = new UsersStore();

const index = async (request: Request, response: Response, next: Function) => {
  const products: ProductModel[] | [] = await store.index();
  const dtos = products.map((p) => ({
      title: p.title,
      price: p.price,
      description: p?.description,
      uid: p.uid,
    }));

  response.status(200).json(dtos);
};

const show = async (request: Request, response: Response, next: Function) => {
  const productUid = request.params.uid;
  const product: ProductModel | undefined = await store.show(productUid);

  if (!product) {
    return next(httpErrors.notFound(`Product not found!`));
  }
  const productDto = {
    title: product.title,
    price: product.price,
    description: product?.description,
    uid: product.uid,
  };
  response.status(200).json(productDto);
};

const create = async (request: Request, response: Response, next: Function) => {
  const user = await userStore.verifyToken(request.headers.authorization);
  if (!user) {
    return next(httpErrors.unauthorized(`Unauthorized user!`));
  }

  const title = request.body.title;
  const description = request.body.description;
  const price = request.body.price;
  const invalidParams = new Array<string>();
  if (!title) {
    invalidParams.push("Title");
  }
  if (!price) {
    invalidParams.push("Price");
  }
  if (invalidParams.length) {
    return next(httpErrors.badData(`Invalid paramters [${invalidParams}]`));
  }

  const uid = generateNanoid(Constants.ALPHABET_UID, 30);
  const product = await store.create({
    uid,
    title,
    description,
    price,
  });

  if (!product) {
    return next(httpErrors.badRequest(`Cant create product!`));
  }
  response.status(201).json({ product });
};

const destroy = async (
  request: Request,
  response: Response,
  next: Function
) => {
  const user = await userStore.verifyToken(request.headers.authorization);
  if (!user) {
    return next(httpErrors.unauthorized(`Unauthorized user!`));
  }

  const productUid = request.params.uid;
  const product: ProductModel | undefined = await store.show(productUid);
  if (!product) {
    return next(httpErrors.notFound(`Product not found!`));
  }
  const deleted = await store.destroy(productUid);
  if (deleted) {
    return response.status(200).send("Product deleted successfully");
  } 
  next(httpErrors.badRequest(`Cant delete this product!`));
};

const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.delete("/products/:uid", destroy);
  app.post("/products", create);
  app.get("/products/:uid", show);
};

export default productsRoutes;
