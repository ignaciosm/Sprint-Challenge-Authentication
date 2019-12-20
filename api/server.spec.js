const request = require("supertest");
const server = require("./server.js");
const db = require('../database/dbConfig');

describe("server.js", function() {
  describe("environment", function() {
    it("should set environment to testing", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe("GET /api/jokes", function() {
    it("should return a 401", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });

  describe("Register", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("create new user and return 201", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "ignacio", password: "test123" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("return a positive number for the id", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "ignacio", password: "test123" })
        .then(res => {
          expect(res.body).toBe(1);
        });
    });
  });

  describe("Login", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("create new user and login", function() {
      const newUser = { username: "ignacio", password: "test123" }
      return request(server)
        .post("/api/auth/register")
        .send(newUser)
        .then(res => {
          
          expect(res.status).toBe(201);

          return request(server)
            .post("/api/auth/login")
            .send(newUser)
            .then(res => {
              const token = res.body.token;
              expect(token).not.toBeNull()
            });

         });

    });
  });
});

