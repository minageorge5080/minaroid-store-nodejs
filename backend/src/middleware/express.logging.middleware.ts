import express from "express";

const loggingMiddleware = (
  request: express.Request,
  response: express.Response,
  next: Function
): void => {
  let body = request.body;
  if (body.password) {
    body = { ...body, password: "*****" };
  }

  console.log(`
   ${"URL:"}           ${request.method + " " + request.url}
   ${"Headers:"}       ${JSON.stringify(request.headers)}
   ${"Query:"}         ${JSON.stringify(request.query)}
   ${"Body:"}          ${JSON.stringify(body)}
   `);
  next();
};

export default loggingMiddleware;
