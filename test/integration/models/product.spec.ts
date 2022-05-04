import { ProductsStore } from "../../../src/models/product.model";

const store = new ProductsStore();

describe("Product Model", function () {
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
        uid: "pro4-uid",
      });
      expect(product?.uid).toEqual("pro4-uid");
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
