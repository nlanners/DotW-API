const app = require('./app');
const request = require('supertest');

describe("GET /", () => {

    describe("successful request", () => {

        // respond with a status code 200
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200);
        });

        // response body shoud have a 'title' key
        test("response body should have a 'title' key", async () => {
            const response = await request(app).get('/');
            const keys = Object.keys(response.body);
            expect(keys).toEqual(expect.arrayContaining(["title"]));
        });

        // response body should have a 'summary' key
        test("response body should have a 'summary' key", async () => {
            const response = await request(app).get('/');
            const keys = Object.keys(response.body);
            expect(keys).toEqual(expect.arrayContaining(["summary"]));
        });

        // response body should have a 'url' key
        test("response body should have a 'url' key", async () => {
            const response = await request(app).get('/');
            const keys = Object.keys(response.body);
            expect(keys).toEqual(expect.arrayContaining(["url"]));
        });

    });

});
