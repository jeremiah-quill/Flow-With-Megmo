const db = require('../config/connection');
const { Teacher } = require('../models');
const teacherSeeds = require('./teacherSeeds.json');

db.once('open', async () => {
  try {
    await Teacher.deleteMany({});
    await Teacher.create(teacherSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
