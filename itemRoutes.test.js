const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');

beforeEach(() => {
    items.length = 0;  // clear the array before each test
    items.push({ name: "popsicle", price: 1.45 });
});

test('GET /items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /items', async () => {
    const res = await request(app).post('/items').send({ name: "cheerios", price: 3.40 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ added: { name: "cheerios", price: 3.40 } });
});

test('GET /items/:name', async () => {
    const res = await request(app).get('/items/popsicle');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
});

test('PATCH /items/:name', async () => {
    const res = await request(app).patch('/items/popsicle').send({ name: "new popsicle", price: 2.45 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: "new popsicle", price: 2.45 } });
});

test('DELETE /items/:name', async () => {
    const res = await request(app).delete('/items/popsicle');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
});

// ... add more tests as necessary

