const { Transaction } = require("../models");
const request = require("supertest");
const app = require("../app");
const snap = require("../utils/snap");

describe("POST register premium user || should be status 201", () => {
  test("register premium user status eq 201", async () => {
    const spySnap = jest.spyOn(snap, "createTransaction").mockImplementation(
      () =>
        new Promise((res, rej) => {
          res({
            token: "FAKETRANSACTIONTOKEN",
            redirect_url: "https://fake_url.com",
          });
        })
    );
    const spyTransaction = jest
      .spyOn(Transaction, "create")
      .mockImplementation(() => ({
        id: "fake_transaction_id",
      }));
    await request(app)
      .post("/user/premium")
      .send({
        price: 100000,
        user: {
          full_name: "test",
          email: "test@mail.com",
          phone: "0857000000",
        },
      })
      .then((response) => {
        expect(spyTransaction).toHaveBeenCalled();
        expect(spySnap).toHaveBeenCalled();
        expect(response.body).toHaveProperty(
          "transactionToken",
          "FAKETRANSACTIONTOKEN"
        );
        expect(response.body).toHaveProperty(
          "redirect_url",
          "https://fake_url.com"
        );
      });
  });
});

describe("POST register premium user || should get catch from request", () => {
  test("register premium user fail", async () => {
    const spySnap = jest.spyOn(snap, "createTransaction").mockImplementation(
      () =>
        new Promise((res, rej) => {
          res({
            token: "FAKETRANSACTIONTOKEN",
            redirect_url: "https://fake_url.com",
          });
          rej(new Error("createTransaction fail"));
        })
    );
    const spyTransaction = jest
      .spyOn(Transaction, "create")
      .mockImplementation(() => ({
        id: "fake_transaction_id",
      }));
    const requestTesting = await request(app).post("/user/premium").send({
      price: 100000,
    });
    expect(requestTesting.body).toHaveProperty("code", 500);
  });
});
