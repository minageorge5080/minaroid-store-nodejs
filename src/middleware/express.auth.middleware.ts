import express from "express";
import httpErrors from "@hapi/boom";
import jwt from "jsonwebtoken";
import { UsersStore } from "../models/user.model";

const store = new UsersStore();

const authMiddleware = async (request: express.Request, response: express.Response, next: Function ) => {
  
  const authorizedUser = await store.verifyToken(request.headers.authorization);
  
  if(request.url == "/products" && request.method == 'POST' && !authorizedUser){
    return next(httpErrors.unauthorized("Unauthorized user!"));
  } 

  if(request.url.startsWith("/users") && !authorizedUser){
    return next(httpErrors.unauthorized("Unauthorized user!"));
  } 

  if(request.url.startsWith("/orders") && !authorizedUser){
    return next(httpErrors.unauthorized("Unauthorized user!"));
  } 
  
  return next();

};

export default authMiddleware;
