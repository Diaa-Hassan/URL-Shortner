import { connectTestDB, disconnectTestDB } from '../utils/connect-test-db.js';


beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});
