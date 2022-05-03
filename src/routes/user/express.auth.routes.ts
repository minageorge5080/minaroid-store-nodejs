import express, { Request, Response } from "express";
import { UsersStore } from "../../models/user.model";
import jwt from "jsonwebtoken";
import httpErrors from "@hapi/boom";
import bcrypt from "bcrypt";
import randtoken from "rand-token";
import { generateNanoid } from "../../utils";
import { Constants } from "../../utils/Constants";

const store = new UsersStore();
const authRoute = express.Router();

authRoute.post(
  "/login",
  async (request: Request, response: Response, next: Function) => {
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

    const user = await store.findUserByUsername(username);
    if (!user) {
      return next(httpErrors.badData(`Invalid username or password!`));
    }

    password = password + process.env.BCRYPT_PASSWORD;
    const isValidPassword = await bcrypt.compare(
      password,
      user?.password_digest
    );
    if (!isValidPassword) {
      return next(httpErrors.badData(`Invalid username or password!`));
    }

    const token = jwt.sign(
      {uid: user.uid},
      process.env.TOKEN_SECRET ?? ""
    );

    response.status(200).json({ token });
  }
);

authRoute.post(
  "/create-account",
  async (request: Request, response: Response, next: Function) => {
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

    const isUsernameExists = await store.findUserByUsername(username);
    if (isUsernameExists) {
      return next(httpErrors.badData(`Username is already exist!`));
    }

    password = password + process.env.BCRYPT_PASSWORD;
    const password_digest = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_PASSWORD ?? "0")
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

    // valid for an hour.
    const token = jwt.sign(
      { uid: user.uid },
      process.env.TOKEN_SECRET ?? ""
    );

    response.status(201).json({ token });
  }
);

export default authRoute;
