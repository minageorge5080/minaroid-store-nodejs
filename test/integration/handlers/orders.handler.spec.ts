import server from "../../../src/server";
import supertest from "supertest";

const request = supertest(server);

describe("Orders handler", function () {

  it("Create order - unauthorized", (done) => {
    (async function () {
      const response = await request.post( "/orders");
      expect(response.status).toBe(401);
      done();
    })();
  });

  it("Create order - authorization", (done) => {
    (async function () {
      const response = await request.post( "/orders").set({"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU"})
      .send({
        products: [
          {uid: 'product-1-uid',  quantity: 4},
          {uid: 'product-12-uid',  quantity: 4},
        ]
      });
       console.log(response.body)
      expect(response.status).toBe(200);
      expect(response.body.id).toBeDefined();

      done();
    })();
  });

  it("List orders - authorized", (done) => {
    (async function () {
      const response = await request.get( "/orders").set({"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU"});
      expect(response.status).toBe(200);
      done();
    })();
  });

  it("List orders - authorization", (done) => {
    (async function () {
      const response = await request.get( "/orders");
      expect(response.status).toBe(401);
      done();
    })();
  });

  it("Show order - authorized", (done) => {
    (async function () {
      const response = await request.get( "/orders/51").set({"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU"})
      expect(response.status).toBe(200);
      done();
    })();
  });
  

  it("Show order - unauthorized", (done) => {
    (async function () {
      const response = await request.get( "/orders/51")
       expect(response.status).toBe(401);
      done();
    })();
  });

});

