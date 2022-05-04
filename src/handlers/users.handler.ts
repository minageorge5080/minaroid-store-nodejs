import express, { Request, Response } from "express";
import { UsersStore } from "../models/user.model";
import jwt from "jsonwebtoken";
import httpErrors from "@hapi/boom";
import bcrypt from "bcrypt";
import { generateNanoid } from "../utils";
import { Constants } from "../utils/Constants";

const store = new UsersStore();

const index = async (request: Request, response: Response, next: Function) => {
  const user = await store.verifyToken(request.headers.authorization);
  if (!user) {
    return next(httpErrors.unauthorized(`Unauthorized user!`));
  }

  const users = await store.index();
  const userDtos = users.map((user) => ({
      firstname: user?.firstname,
      username: user?.username,
      lastname: user?.lastname,
      uid: user?.uid,
    }));
  response.status(200).json(userDtos);
};

const show = async (
  request: express.Request,
  response: Response,
  next: Function
) => {
  const authorization = await store.verifyToken(request.headers.authorization);
  if (!authorization) {
    return next(httpErrors.unauthorized(`Unauthorized user!`));
  }

  const user = await store.showByUid(request.params.uid);
  if (!user) {
    return next(httpErrors.notFound(`User not found!`));
  }

  const userDto = {
    firstname: user?.firstname,
    username: user?.username,
    lastname: user?.lastname,
    uid: user?.uid,
  };

  response.status(200).json(userDto);
};

const login = async (request: Request, response: Response, next: Function) => {
  const username = request.body.username;
  let password = request.body.password;

  const invalidParams = new Array<string>();
  if (!username) {
    invalidParams.push("Username");
  }
  if (!password) {
    invalidParams.push("Password");
  }
  if (invalidParams.length) {
    return next(httpErrors.badData(`Invalid paramters [${invalidParams}]`));
  }

  const user = await store.showByUsername(username);
  if (!user) {
    return next(httpErrors.badData(`Invalid username or password!`));
  }

  password = password + process.env.BCRYPT_PASSWORD;
  const isValidPassword = await bcrypt.compare(password, user?.password_digest);
  if (!isValidPassword) {
    return next(httpErrors.badData(`Invalid username or password!`));
  }

  const token = jwt.sign({ uid: user.uid }, process.env.TOKEN_SECRET ?? "");

  response.status(200).json({ token });
};

const signup = async (request: Request, response: Response, next: Function) => {
  const username = request.body.username;
  const firstname = request.body.firstname;
  const lastname = request.body.lastname;
  let password = request.body.password;

  const invalidParams = new Array<string>();
  if (!username) {
    invalidParams.push("Username");
  }
  if (!password) {
    invalidParams.push("Password");
  }
  if (invalidParams.length) {
    return next(httpErrors.badData(`Invalid paramters [${invalidParams}]`));
  }

  const isUsernameExists = await store.showByUsername(username);
  if (isUsernameExists) {
    return next(httpErrors.badData(`Username is already exist!`));
  }

  password = password + process.env.BCRYPT_PASSWORD;
  const password_digest = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_PASSWORD ?? "10")
  );

  const uid = generateNanoid(Constants.ALPHABET_UID, 30);

  const user = await store.create({
    username,
    firstname,
    lastname,
    password_digest,
    uid,
  });
  if (!user) {
    return next(httpErrors.badRequest(`Cant create user!`));
  }

  const token = jwt.sign({ uid: user.uid }, process.env.TOKEN_SECRET ?? "");

  response.status(201).json({ token });
};

const profileRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:uid", show);
  app.post("/users/login", login);
  app.post("/users/signup", signup);
};

export default profileRoutes;
