const request = require('supertest');
const { app } = require('./testServer');
const setupDB = require('./testDatabase');
const { MSG_CONST, STATUS_CONST } = require('../src/constants/statusMessage.contants');

beforeEach(async () => {
    await setupDB();

    // Create a user for login tests
    await request(app)
        .post('/api/auth/register')
        .send({
            email: 'test@example.com',
            password: '123456',
            role: 'Attendee',
        });
});

describe('Auth API', () => {

    // Registration API Tests
    it('should register a user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test1@example.com',
                password: '123456',
                role: 'Attendee',
            });

        expect(res.statusCode).toBe(STATUS_CONST.success_create);
        expect(res.body).toHaveProperty('message', MSG_CONST.success_create);
    });

    it('should not register a user: Duplicate entry', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: '123456',
                role: 'Attendee',
            });

        expect(res.statusCode).toBe(STATUS_CONST.failure_create);
        expect(res.body).toHaveProperty('message', MSG_CONST.failure_duplicate_create);
    });

    it('should register a user: Role missing', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test2@example.com',
                password: '123456'
            });

        expect(res.statusCode).toBe(STATUS_CONST.success_create);
        expect(res.body).toHaveProperty('message', MSG_CONST.success_create);
    });

    it('should not register a user: No Email Case', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: '',
                password: '123456',
                role: 'Attendee',
            });

        expect(res.statusCode).toBe(STATUS_CONST.failure_create);
        expect(res.body).toHaveProperty('message', MSG_CONST.failure_create);
    });

    it('should not register a user: No Password Case', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test3@example.com',
                password: '',
                role: 'Attendee',
            });

        expect(res.statusCode).toBe(STATUS_CONST.failure_create);
        expect(res.body).toHaveProperty('message', MSG_CONST.failure_create);
    });

    // Login API Tests
    it('should login successfully', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: '123456'
            });

        expect(res.statusCode).toBe(STATUS_CONST.success);
    });

    it('should not login: Wrong Password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrong-password'
            });

        expect(res.statusCode).toBe(STATUS_CONST.not_found_error);
        expect(res.body).toHaveProperty('message', MSG_CONST.invalid_cred_error);
    });

    it('should not login: Wrong Email', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'doesnotexist@example.com',
                password: '123456'
            });

        expect(res.statusCode).toBe(STATUS_CONST.not_found_error);
        expect(res.body).toHaveProperty('message', MSG_CONST.invalid_cred_error);
    });
});
