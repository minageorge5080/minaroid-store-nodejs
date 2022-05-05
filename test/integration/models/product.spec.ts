import { ProductsStore } from "../../../src/models/product.model";

const store = new ProductsStore();

describe("Product Model", function () {
  beforeAll(async () => {
    await store.create({
      title: "product-1",
      description: "mina",
      price: 500,
      uid: "product-1-uid",
    });
    await store.create({
      title: "product-2",
      description: "mina",
      price: 500,
      uid: "product-12-uid",
    });
    await store.create({
      title: "product-2",
      description: "mina",
      price: 500,
      uid: "product-123-uid",
    });
  });

  afterAll(async () => {
    await store.destroy("product-1-uid");
    await store.destroy("product-12-uid");
    await store.destroy("product-123-uid");
    await store.destroy("product-124-uid");
  });

  it("List products", (done) => {
    (async function () {
      expect(store.index).toBeDefined();
      const results = await store.index();
      expect(results.length).toEqual(3);
      done();
    })();
  });

  it("Create new product", (done) => {
    (async function () {
      expect(store.create).toBeDefined();
      const product = await store.create({
        price: 400,
        title: "mina",
        description: "Test",
        uid: "product-124-uid",
      });
      expect(product?.uid).toEqual("product-124-uid");
      done();
    })();
  });

  it("Show product by uid", (done) => {
    (async function () {
      expect(store.show).toBeDefined();
      const product = await store.show("product-1-uid");
      expect(product).toBeDefined();
      done();
    })();
  });

  it("Destroy product", (done) => {
    (async function () {
      expect(store.destroy).toBeDefined();
      const deleted = await store.destroy("pro4-uid");
      expect(deleted).toEqual(true);
      done();
    })();
  });
});
