const request = require('supertest');
const { app } = require('./testServer');
const setupDB = require('./testDatabase');
const { STATUS_CONST, MSG_CONST } = require('../src/constants/statusMessage.contants');

let createdEventId;

beforeEach(async () => {
    await setupDB();

    const res = await request(app)
        .post('/api/event/')
        .send({
            name: "Original Event",
            description: "Original description",
            date: "2025-08-29",
            time: "15:00",
            category: ["Tech"],
            isAvailable: true
        });

    createdEventId = res.body.data.id;
    console.log('Created Event ID:', createdEventId);
});

describe('Event API tests', () => {

    it('should add an event', async () => {
        const res = await request(app)
            .post('/api/event/')
            .send({
                name: "JS Meetup",
                description: "An event bringing together MS leaders and innovators.",
                date: "2025-08-24",
                time: "15:30",
                category: ["Technology", "MS"],
                isAvailable: true
            });
        expect(res.statusCode).toBe(STATUS_CONST.success_create);
        expect(res.body.data.name).toBe("JS Meetup");
    });

    it('should get all events', async () => {
        const res = await request(app).get('/api/event/');
        expect(res.statusCode).toBe(STATUS_CONST.success);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should fail editing non-existent event', async () => {
        const res = await request(app)
            .put('/api/event/9999')
            .send({
                name: "Non-existent Event",
                description: "Invalid update",
                date: "2025-08-30",
                time: "16:00",
                category: ["Invalid"]
            });

        expect(res.statusCode).toBe(STATUS_CONST.not_found_error);
    });

    it('should get event by ID', async () => {
        const res = await request(app).get(`/api/event/${createdEventId}`);
        expect(res.statusCode).toBe(STATUS_CONST.success);
        expect(res.body.data.id).toBe(createdEventId);
    });

    it('should remove an event by ID', async () => {
        const res = await request(app).delete(`/api/event/${createdEventId}`);
        expect(res.statusCode).toBe(STATUS_CONST.success);
    });

    it('should fail removing non-existent event', async () => {
        const res = await request(app).delete('/api/event/9999');
        expect(res.statusCode).toBe(STATUS_CONST.not_found_error);
    });
});
