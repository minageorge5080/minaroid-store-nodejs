import server from "../../../src/server";
import supertest from "supertest";
import { UserModel, UsersStore } from "../../../src/models/user.model";
import { ProductModel, ProductsStore } from "../../../src/models/product.model";
import { OrderModel, OrdersStore } from "../../../src/models/order.model";
import { ORDER_STATUS } from "../../../src/utils/Constants";

const request = supertest(server);

const ordersStore = new OrdersStore();
const usersStore = new UsersStore();
const productsStore = new ProductsStore();

describe("Orders handler", function () {
  let user: UserModel | undefined;
  let order: OrderModel | undefined;
  let product: ProductModel | undefined;

  beforeAll(async () => {
    user = await usersStore.create({
      username: "mina2",
      firstname: "mina",
      lastname: "george",
      password_digest:
        "$2b$10$bTP6vzI1i5FGKa0kQv6A3uON2hAEGc1lLIFwcvJmt6VIKVVFtL3qG",
      uid: "mina2-uid",
    });
    product = await productsStore.create({
      title: "product-1",
      description: "mina",
      price: 500,
      uid: "product-1-uid",
    });
    order = await ordersStore.create(ORDER_STATUS.ACTIVE, user?.id);
    await ordersStore.addProductToOrder(4, order?.id, product?.id);
  });

  afterAll(async () => {
    await ordersStore.destroy(order?.id);
    await productsStore.destroy(product?.uid);
    await usersStore.destroy(user?.uid);
  });

  it("Create order - unauthorized", (done) => {
    (async function () {
      const response = await request.post("/orders");
      expect(response.status).toBe(401);
      done();
    })();
  });

  it("Create order - authorization", (done) => {
    (async function () {
      const response = await request
        .post("/orders")
        .set({
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU",
        })
        .send({
          products: [{ uid: product?.uid, quantity: 4 }],
        });
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.id).toBeDefined();
      done();
    })();
  });

  it("List orders - authorized", (done) => {
    (async function () {
      const response = await request.get("/orders").set({
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU",
      });
      expect(response.status).toBe(200);
      done();
    })();
  });

  it("List orders - authorization", (done) => {
    (async function () {
      const response = await request.get("/orders");
      expect(response.status).toBe(401);
      done();
    })();
  });

  it("Show order - authorized", (done) => {
    (async function () {
      const response = await request.get(`/orders/${order?.id}`).set({
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU",
      });
      expect(response.status).toBe(200);
      done();
    })();
  });

  it("Show order - unauthorized", (done) => {
    (async function () {
      const response = await request.get(`/orders/${order?.id}`);
      expect(response.status).toBe(401);
      done();
    })();
  });
});
