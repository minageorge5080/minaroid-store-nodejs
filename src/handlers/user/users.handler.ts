import express, { Request, Response } from "express";
import { UserModel, UsersStore } from "../../models/user.model";
import httpErrors from "@hapi/boom";

const store = new UsersStore();

const index = async (request: Request, response: Response, next: Function) => {
  const users = await store.index();
  const userDtos = users.map((user) => {
    return {
      firstname: user?.firstname,
      username: user?.username,
      lastname: user?.lastname,
      uid: user?.uid,
    };
  })
  response.status(200).json(userDtos);
};

const show = async (request: express.Request, response: Response, next: Function) => {
  const user = await store.showByUid(request.params.uid);
  if (!user) { return next(httpErrors.notFound(`User not found!`)); }
  
  const userDto = {
    firstname: user?.firstname,
    username: user?.username,
    lastname: user?.lastname,
    uid: user?.uid,
  };

  response.status(200).json(userDto);
};

const profileRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:uid", show);

};


export default profileRoutes;
