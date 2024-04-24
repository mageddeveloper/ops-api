test('GET /users', async () => {
    const response = await request(app).get('/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
});
