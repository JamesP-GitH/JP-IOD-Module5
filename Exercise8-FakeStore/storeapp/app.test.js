const request = require("supertest");
const app = require("./app");

describe("GET /api/products", () => {
    test("should return a list of products", async () => {
        const response = await request(app).get(`/api/products`).expect("Content-Type", /json/).expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("should return a single product object", async () => {
        const response = await request(app).get("/api/products/1").expect("Content-Type", /json/).expect(200);

        expect(response.body).toHaveProperty("id", 1);
        expect(response.body).toHaveProperty("title");
    });

    test("should return 400 for invalid product ID", async () => {
        const response = await request(app).get("/api/products/99999").expect("Content-Type", /json/).expect(404);

        expect(response.body).toHaveProperty("message", "Product not found");
    });
});
