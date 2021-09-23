const request = require("supertest");
const app = require('../app')

describe("Dummy test to test github workflow", () => {
  test("A should equal to A", () => {
    const dummy = "A";
    expect(dummy).toBe("A");
  });
});

describe("POST register premium user || should be status 201", () => {
  test("register premium user status eq 201", () => {
    request(app)
    .post('/user/premium')
    .send({
      "price": 100000,
      "user": { 
          "full_name": "test", 
          "email": "test@mail.com", 
          "phone": "0857000000" 
      }
    })
    .then((response) => {
      expect(response.statusCode).toBe(201);
      expect(response.body).to.have.property('redirect_url');
      done();
    });
  });
});
