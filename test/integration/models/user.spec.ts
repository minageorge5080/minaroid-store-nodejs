import { UsersStore } from "../../../src/models/user.model";

const store = new UsersStore();

describe("User Model", function () {
  beforeAll(async () => {
    await store.create({
      username: "mina1",
      firstname: "mina",
      lastname: "george",
      password_digest:
        "$2b$10$bTP6vzI1i5FGKa0kQv6A3uON2hAEGc1lLIFwcvJmt6VIKVVFtL3qG",
      uid: "mina1-uid",
    });
    await store.create({
      username: "mina2",
      firstname: "mina",
      lastname: "george",
      password_digest:
        "$2b$10$bTP6vzI1i5FGKa0kQv6A3uON2hAEGc1lLIFwcvJmt6VIKVVFtL3qG",
      uid: "mina2-uid",
    });
  });

  afterAll(async () => {
    await store.destroy("mina1-uid");
    await store.destroy("mina2-uid");
    await store.destroy("mina3-uid");
  });

  it("List users", (done) => {
    (async function () {
      expect(store.index).toBeDefined();
      const results = await store.index();
      expect(results.length).toEqual(2);
      done();
    })();
  });

  it("Create new user", (done) => {
    (async function () {
      expect(store.create).toBeDefined();
      const user = await store.create({
        username: "mina3",
        firstname: "mina",
        lastname: "george",
        password_digest:
          "$2b$10$bTP6vzI1i5FGKa0kQv6A3uON2hAEGc1lLIFwcvJmt6VIKVVFtL3qG",
        uid: "mina3-uid",
      });
      expect(user?.uid).toEqual("mina3-uid");
      done();
    })();
  });

  it("Valid token", (done) => {
    (async function () {
      expect(store.verifyToken).toBeDefined();
      const user = await store.verifyToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjU0Njl9.4lwUVC3eRUNws8ATLJcHpn9ayBddt51siPD5M6XV1E4"
      );
      expect(user).toBeDefined();
      done();
    })();
  });

  it("Invalid token", (done) => {
    (async function () {
      expect(store.verifyToken).toBeDefined();
      const user = await store.verifyToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjU0Njl9.4lwUVC3eRUNws8ATLJcHpn9ayBddt51siPD5M6XV1E455"
      );
      expect(user).toBeUndefined();
      done();
    })();
  });

  it("Show user by uid", (done) => {
    (async function () {
      expect(store.showByUid).toBeDefined();
      const user = await store.showByUid("mina2-uid");
      expect(user).toBeDefined();
      done();
    })();
  });

  it("Show user by username", (done) => {
    (async function () {
      expect(store.showByUid).toBeDefined();
      const user = await store.showByUsername("mina2");
      expect(user).toBeDefined();
      done();
    })();
  });
});
