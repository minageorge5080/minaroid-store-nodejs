import { OrderModel, OrdersStore } from "../../../src/models/order.model";
import { ProductModel, ProductsStore } from "../../../src/models/product.model";
import { UserModel, UsersStore } from "../../../src/models/user.model";
import { ORDER_STATUS } from "../../../src/utils/Constants";

const ordersStore = new OrdersStore();
const usersStore = new UsersStore();
const productsStore = new ProductsStore();

describe("Order Model", function () {
  let user: UserModel | undefined;
  let order: OrderModel | undefined;
  let createdOrder: OrderModel | undefined;
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
    await ordersStore.destroy(createdOrder?.id);
    await ordersStore.destroy(order?.id);
    await productsStore.destroy(product?.uid);
    await usersStore.destroy(user?.uid);
  });

  it("Create new order", (done) => {
    (async function () {
      expect(ordersStore.create).toBeDefined();
      createdOrder = await ordersStore.create(ORDER_STATUS.ACTIVE, 50);
      expect(createdOrder).toBeDefined;
      done();
    })();
  });

  it("Add product to order", (done) => {
    (async function () {
      expect(ordersStore.addProductToOrder).toBeDefined();
      const res = await ordersStore.addProductToOrder(
        5,
        order?.id,
        product?.id
      );
      expect(res).toEqual(true);
      done();
    })();
  });

  it("Show order by id", (done) => {
    (async function () {
      expect(ordersStore.show).toBeDefined();
      const createdOrder = await ordersStore.show(order?.id, user?.id);
      expect(createdOrder?.id).toEqual(2);
      done();
    })();
  });

  it("List user orders", (done) => {
    (async function () {
      expect(ordersStore.index).toBeDefined();
      const orders = await ordersStore.index(user?.id);
      expect(orders.length).toEqual(1);
      done();
    })();
  });
});
