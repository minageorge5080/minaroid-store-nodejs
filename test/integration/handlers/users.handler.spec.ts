import server from "../../../src/server";
import supertest from "supertest";

const request = supertest(server);

describe("Users handler", function () {

  it("List users - unauthorized", (done) => {
    (async function () {
      const response = await request.get( "/users");
      expect(response.status).toBe(401);
      done();
    })();
  });

  it("List users - authorization", (done) => {
    (async function () {
      const response = await request.get( "/users").set({"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU"});
      expect(response.status).toBe(200);
      done();
    })();
  });

  it("Show user - unauthorized", (done) => {
    (async function () {
      const response = await request.get( "/users/mina2-uid");
      expect(response.status).toBe(401);
      done();
    })();
  });

  it("Show user - authorization", (done) => {
    (async function () {
      const response = await request.get( "/users/mina2-uid").set({"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaW5hMi11aWQiLCJpYXQiOjE2NTE2MjgzNDh9.muCDO6-cC3PomBbmGiv_QW_fCjqfumTljjxRVB7H0aU"});
      expect(response.status).toBe(200);
      done();
    })();
  });

  it("Signup user ", (done) => {
    (async function () {
      const response = await request.post( "/users/signup")
      .send({
       password: 12345,
       firsname: 'mina',
       lastname: 'mina2',
       username: 'mina500'
      })
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
      done();
    })();
  });

  it("Signup with invalid username ", (done) => {
    (async function () {
      const response = await request.post( "/users/signup")
      .send({
       password: 12345,
       firsname: 'mina',
       lastname: 'mina2',
       username: 'mina500'
      })
      expect(response.status).toBe(422);
      expect(response.body.token).toBeUndefined();
      done();
    })();
  });
 
  it("Login with invalid username ", (done) => {
    (async function () {
      const response = await request.post( "/users/login")
      .send({
       password: 12345,
       username: 'mina5000'
      })
      expect(response.status).toBe(422);
      expect(response.body.token).toBeUndefined();
      done();
    })();
  });

  it("Login with valid username ", (done) => {
    (async function () {
      const response = await request.post( "/users/login")
      .send({
       password: 12345,
       username: 'mina500'
      })
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      done();
    })();
  });
});

