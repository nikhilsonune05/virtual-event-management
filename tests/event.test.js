const request = require('supertest');
const { app } = require('./testServer');
const setupDB = require('./testDatabase');
const { MSG_CONST, STATUS_CONST } = require('../src/constants/statusMessage.contants');

let createdEventId;

beforeEach(async () => {
  await setupDB();

  // Create initial event for edit/remove/get tests
  const res = await request(app)
    .post('/api/event/')
    .send({
      name: "Initial Event",
      description: "Description for initial event",
      date: "2025-08-24",
      time: "15:30",
      category: ["Tech"],
      isAvailable: true
    });

  createdEventId = res.body.data.id;
});

describe('Event API test', () => {

  it('addEvent', async () => {
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

  it('getAllEvents', async () => {
    const res = await request(app).get('/api/event/');
    expect(res.statusCode).toBe(STATUS_CONST.success);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('editEvent should fail for non-existent ID', async () => {
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

  it('getEventById', async () => {
    const res = await request(app).get(`/api/event/${createdEventId}`);
    expect(res.statusCode).toBe(STATUS_CONST.success);
    expect(res.body.data.id).toBe(createdEventId);
  });

  it('removeEvent', async () => {
    const res = await request(app).delete(`/api/event/${createdEventId}`);
    expect(res.statusCode).toBe(STATUS_CONST.success);
  });

  it('removeEvent should fail for invalid ID', async () => {
    const res = await request(app).delete('/api/event/9999');
    expect(res.statusCode).toBe(STATUS_CONST.not_found_error);
  });

});
