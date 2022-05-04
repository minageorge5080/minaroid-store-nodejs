import express from "express";

const errorsMiddleware = (
  error: any, // typed to any so i can get output object to get my custom error.
  request: express.Request,
  response: express.Response,
  next: Function
): express.Response => {
  const statusCode = error?.output?.statusCode ?? error.status ?? 500;
  let message = "Somthing wrong, try again later";
  switch (statusCode) {
    case 401:
      message = error?.message ?? "Unauthorized!";
      console.error("Caught Unauthorized Exception");
      return response.status(statusCode).json({ message });

    default:
      message = error?.message ?? "Somthing wrong, try again later.";
      console.error(error?.data ?? error);
      return response.status(statusCode).json({ message });
  }
};

export default errorsMiddleware;
