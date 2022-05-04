import server from "../../../src/server";
import supertest from "supertest";

const request = supertest(server);

describe("Products handler", function () {
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
          title: "prod3",
          descreption: "test",
          price: 400,
        });
      console.log(response.body);
      expect(response.status).toBe(201);
      expect(response.body.product.price).toBe(400);

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
      const response = await request
        .delete("/products/product-123-uid")
        .set({
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
