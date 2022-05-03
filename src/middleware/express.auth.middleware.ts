import express from "express";
import httpErrors from "@hapi/boom";
import jwt from "jsonwebtoken";

const errorsMiddleware = (
  request: any,
  response: express.Response,
  next: Function
): any => {
  
  if (request.url.startsWith("/public")) {
    return next();
  }

  const token = request.headers.authorization;
  const authorizedRequests = ["profile", "orders"];

  if(authorizedRequests.includes(request.url.split("/")[1])){
    if (!token) {
      return next(httpErrors.unauthorized("No token provided!"));
    }
    jwt.verify(
      token.replace("Bearer ", ""),
      process.env.TOKEN_SECRET ?? "",
      (error: any, decoded: any) => {
        if (error || !decoded) {
          return next(httpErrors.unauthorized("Unauthorized!"));
        }
        request.uid = decoded.uid;
        return next();
      }
    );
  } else { 
    if (token) {
      jwt.verify(
        token.replace("Bearer ", ""),
        process.env.TOKEN_SECRET ?? "",
        (error: any, decoded: any) => {
          request.uid = decoded?.uid;
          return next();
        }
      );
    } else {
      return next();
    }
  }

};

export default errorsMiddleware;
