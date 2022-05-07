import express from "express";
import httpErrors from "@hapi/boom";
import jwt from "jsonwebtoken";
import { UserModel, UsersStore } from "../models/user.model";

const store = new UsersStore();

const authMiddleware = async (
  request: express.Request,
  response: express.Response,
  next: Function
) => {
  const authorizedUser = await verifyToken(request.headers.authorization);
  if (!authorizedUser) {
    return next(httpErrors.unauthorized("Unauthorized user!"));
  }
  response.locals.userId = authorizedUser?.id ?? 0;
  return next();
};

const verifyToken = (token?: string): Promise<UserModel | undefined> =>
  new Promise((resolve, reject) => {
    if (!token) {
      return resolve(undefined);
    }
    jwt.verify(
      token.replace("Bearer ", ""),
      process.env.TOKEN_SECRET ?? "",
      (error, decoded) => {
        if (!error && decoded) {
          return resolve(store.showByUid((decoded as { uid: string }).uid));
        }
        return resolve(undefined);
      }
    );
  });

export default authMiddleware;
