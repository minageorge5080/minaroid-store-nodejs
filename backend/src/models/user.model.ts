import client from "../database";
import jwt from "jsonwebtoken";

export type UserModel = {
  id?: number;
  uid: string;
  password_digest: string;
  username: string;
  firstname?: string;
  lastname?: string;
};

export class UsersStore {
  async destroy(uid?: string): Promise<boolean> {
    if (!uid) {
      return false;
    }
    const sql = "DELETE FROM users WHERE uid=($1)";
    const conn = await client.connect();
    return await conn
      .query(sql, [uid])
      .catch((e) => false)
      .then(() => true)
      .finally(() => conn.release());
  }

  async destroyByUsername(username?: string): Promise<boolean> {
    if (!username) {
      return false;
    }
    const sql = "DELETE FROM users WHERE username=($1)";
    const conn = await client.connect();
    return await conn
      .query(sql, [username])
      .catch((e) => false)
      .then(() => true)
      .finally(() => conn.release());
  }

  async showByUid(uid?: string): Promise<UserModel | undefined> {
    if (!uid) {
      return undefined;
    }
    const sql = "SELECT * FROM users WHERE uid=($1)";
    const conn = await client.connect();
    return await conn
      .query(sql, [uid])
      .then((result) => result.rows[0] ?? undefined)
      .finally(() => conn.release());
  }

  async showByUsername(username?: string): Promise<UserModel | undefined> {
    if (!username) {
      return undefined;
    }
    const sql = "SELECT * FROM users WHERE username=($1)";
    const conn = await client.connect();
    return await conn
      .query(sql, [username])
      .then((result) => result.rows[0] ?? undefined)
      .catch((e) => undefined)
      .finally(() => conn.release());
  }

  async index(): Promise<UserModel[] | []> {
    const sql = "SELECT * FROM users";
    const conn = await client.connect();
    return await conn
      .query(sql)
      .then((result) => result.rows ?? [])
      .catch((e) => [])
      .finally(() => conn.release());
  }

  async create(user: UserModel): Promise<UserModel | undefined> {
    const sql =
      "INSERT INTO users (uid, firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const conn = await client.connect();
    return await conn
      .query(sql, [
        user.uid,
        user.firstname,
        user.lastname,
        user.username,
        user.password_digest,
      ])
      .then((result) => result.rows[0] ?? undefined)
      .catch((e) => undefined)
      .finally(() => conn.release());
  }
}
