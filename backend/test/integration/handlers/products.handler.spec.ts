import server from "../../../src/server";
import supertest from "supertest";
import { ProductsStore } from "../../../src/models/product.model";
import { UsersStore } from "../../../src/models/user.model";

const request = supertest(server);
const productsStore = new ProductsStore();
const usersStore = new UsersStore();

describe("Products handler", function () {
  let createdProductUid: string = "";

  beforeAll(async () => {
    await usersStore.create({
      username: "mina2",
      firstname: "mina",
      lastname: "george",
      password_digest:
        "$2b$10$bTP6vzI1i5FGKa0kQv6A3uON2hAEGc1lLIFwcvJmt6VIKVVFtL3qG",
      uid: "mina2-uid",
    });
    await productsStore.create({
      title: "product-1",
      description: "mina",
      price: 500,
      uid: "product-1-uid",
    });
    await productsStore.create({
      title: "product-2",
      description: "mina",
      price: 500,
      uid: "product-12-uid",
    });
    await productsStore.create({
      title: "product-2",
      description: "mina",
      price: 500,
      uid: "product-123-uid",
    });
  });

  afterAll(async () => {
    await usersStore.destroy("mina2-uid");
    await productsStore.destroy("product-1-uid");
    await productsStore.destroy("product-12-uid");
    await productsStore.destroy("product-123-uid");
    await productsStore.destroy(createdProductUid);
  });

  it("Create product - unauthorized", (done) => {
    (async function () {
      const response = await request.post("/products");
      expect(response.status).toBe(401);
      done();
    })();
  });

  it("Create product - authorization", (done) => {
    (async function () {
      const response = await request
        .post("/products")
        .set({
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU",
        })
        .send({
          title: "prod4",
          descreption: "test",
          price: 400,
        });
      console.log(response.body);
      expect(response.status).toBe(201);
      expect(response.body.product.price).toBe(400);
      createdProductUid = response.body.product.uid;
      done();
    })();
  });

  it("Delete product - unauthorized", (done) => {
    (async function () {
      const response = await request.delete("/products/product-123-uid");
      expect(response.status).toBe(401);
      done();
    })();
  });

  it("Delete product - authorized", (done) => {
    (async function () {
      const response = await request.delete("/products/product-123-uid").set({
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU",
      });
      expect(response.status).toBe(200);
      done();
    })();
  });

  it("List products", (done) => {
    (async function () {
      const response = await request.get("/products");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      done();
    })();
  });
});
