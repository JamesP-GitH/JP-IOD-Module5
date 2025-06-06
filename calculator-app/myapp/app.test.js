const request = require("supertest");
const app = require("./app");

describe("Calculator Routes", () => {
    // generate some random numbers to test the calculator
    let number1 = Math.floor(Math.random() * 1_000_000);
    let number2 = Math.floor(Math.random() * 1_000_000);

    test("GET /calculator/add => sum of numbers", () => {
        return request(app)
            .get(`/calculator/add?num1=${number1}&num2=${number2}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    result: number1 + number2,
                });
            });
    });

    test("GET /calculator/subtract => difference of numbers", () => {
        return request(app)
            .get(`/calculator/subtract?num1=${number1}&num2=${number2}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    result: number1 - number2,
                });
            });
    });

    test("GET /calculator/multiply => product of numbers", () => {
        return request(app)
            .get(`/calculator/multiply?num1=${number1}&num2=${number2}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    result: number1 * number2,
                });
            });
    });

    test("GET /calculator/divide => quotient of numbers", () => {
        return request(app)
            .get(`/calculator/divide?num1=${number1}&num2=${number2}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    result: number1 / number2,
                });
            });
    });

    test("GET /calculator/divide with zero divisor => error", () => {
        return request(app)
            .get(`/calculator/divide?num1=${number1}&num2=0`)
            .expect("Content-Type", /json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toHaveProperty("error");
            });
    });
});

describe("Extra Routes", () => {
    test("GET /extra/random to return whole number between min & max", () => {
        const min = 10;
        const max = 100;
        return request(app)
            .get(`/extra/random?min=${min}&max=${max}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                const { result } = response.body;
                expect(result).toBeGreaterThanOrEqual(min);
                expect(result).toBeLessThanOrEqual(max);
            });
    });

    test("should default min to 0 if not provided", () => {
        const max = 50;

        return request(app)
            .get(`/extra/random?max=${max}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                const { result } = response.body;
                expect(typeof result).toBe("number");
                expect(result).toBeGreaterThanOrEqual(0);
                expect(result).toBeLessThanOrEqual(max);
            });
    });

    test("should return 400 if min > max", () => {
        return request(app)
            .get(`/extra/random?min=100&max=10`)
            .expect("Content-Type", /json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toHaveProperty("error");
            });
    });

    test("should return 400 if inputs are invalid", () => {
        return request(app)
            .get(`/extra/random?min=abc&max=xyz`)
            .expect("Content-Type", /json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toHaveProperty("error");
            });
    });
});
