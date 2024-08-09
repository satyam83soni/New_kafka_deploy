import { kafka } from "./client.js";

async function admin() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic [dice-roll]");
  await admin.createTopics({
    topics: [
      {
        partition: 1,
        topic: "dice-roll",
        numPartitions: 1,
      },
    ],
  });
  console.log("Topic Created Success [dice-roll]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

export {admin};
