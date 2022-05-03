import express, { Request, Response } from "express";
import { UsersStore } from "../../models/user.model";
import httpErrors from "@hapi/boom";

const store = new UsersStore();

const show = async (request: any, response: Response, next: Function) => {
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

const profileRoutes = (app: express.Application) => {
  app.get('/profile', show)
}
 

export default profileRoutes;
