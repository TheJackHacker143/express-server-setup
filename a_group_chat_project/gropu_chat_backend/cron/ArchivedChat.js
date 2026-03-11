const cron = require("node-cron");
const sequelize = require("../dbconnection"); // tumhara sequelize instance

cron.schedule("32 12 * * *", async () => {

  console.log("Chat archive cron started");

  const t = await sequelize.transaction();

  try {

    // STEP 1 → old messages archive table me copy
    await sequelize.query(`
      INSERT INTO ArchivedChat (id, roomName, userId, message, createdAt, updatedAt,time)
      SELECT id, roomName, userId, message, createdAt, updatedAt,time
      FROM messages
      WHERE createdAt < NOW() - INTERVAL 1 DAY
    `, { transaction: t });


    // STEP 2 → messages table se delete
    await sequelize.query(`
      DELETE FROM messages
      WHERE createdAt < NOW() - INTERVAL 1 DAY
    `, { transaction: t });

    await t.commit();

    console.log("Chat archive success");

  } catch (err) {

    await t.rollback();
    console.log("Archive failed", err);

  }

});