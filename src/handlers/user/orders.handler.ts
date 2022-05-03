import express, { Request, Response } from "express";
import httpErrors from "@hapi/boom";

// orderssRoute.get(
//   "/",
//   async (request: any, response: Response, next: Function) => {
//     response.send(request.uid)
//     // const user  = await store.findUserByUid(request.uid)
//     // if(!user) { return next(httpErrors.notFound(`User not found!`)) }
//     // const userDto = {
//     //   "firstname" : user?.firstname,
//     //   "username" : user?.username,
//     //  "lastname" : user?.lastname,
//     //  "uid" : user?.uid
//     // } 
//     // response.status(200).json(userDto)
//   }
// );

const ordersRoutes = (app: express.Application) => {
  // app.get('/orders', index)
}
 

export default ordersRoutes;

