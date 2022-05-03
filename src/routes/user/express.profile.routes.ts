import express, { Request, Response } from "express";
import { UsersStore } from "../../models/user.model";
import httpErrors from "@hapi/boom";

const store = new UsersStore();
const profileRoute = express.Router();

profileRoute.get(
  "/",
  async (request: any, response: Response, next: Function) => {
    const user  = await store.findUserByUid(request.uid)
    if(!user) { return next(httpErrors.notFound(`User not found!`)) }
    const userDto = {
      "firstname" : user?.firstname,
      "username" : user?.username,
     "lastname" : user?.lastname,
     "uid" : user?.uid
    } 
    response.status(200).json(userDto)
  }
);

export default profileRoute;
