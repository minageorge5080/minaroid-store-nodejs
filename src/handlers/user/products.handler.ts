import express, { Request, Response } from "express";
import { ProductModel, ProductsStore } from "../../models/product.model";
import httpErrors from "@hapi/boom";
import { UsersStore } from "../../models/user.model";
import e from "express";

const store = new ProductsStore();

const index = async (request: any, response: Response, next: Function) => {
  const products: ProductModel[] | [] = await store.index();
  const dtos = products.map((p) => {
    return {
      title: p.title,
      price: p.price,
      description: p?.description,
      uid: p.uid,
    };
  });

  response.status(200).json(dtos);
};

const show = async (request: any, response: Response, next: Function) => {
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

const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:uid", show);
};

export default productsRoutes;
