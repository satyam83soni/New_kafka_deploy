import { io } from "../index.js";
import { kafka } from "./client.js";
import mongoose from "mongoose";

import DiceRoll from "../model/dicerole.js";

async function line() {
  const consumer = kafka.consumer({ groupId: "line" });
  const batchSize = 1000;
  let messageBuffer = [];

  try {
    await consumer.connect();
    console.log("Consumer connected successfully");

    await consumer.subscribe({ topics: ["dice-roll"], fromBeginning: true });
    console.log("Subscribed to topic 'dice-roll'");

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        const messageValue = JSON.parse(message.value.toString());

        messageBuffer.push(messageValue);

        if (io && typeof io.emit === "function") {
          io.emit("NEW_ROLL_LINE", messageValue);
          console.log("NEW_ROLL_LINE", messageValue);
        } else {
          console.error("io object is not properly initialized");
        }

        if (messageBuffer.length >= batchSize) {
          await processBatch(messageBuffer);
          messageBuffer = [];
        }
      },
    });

    console.log("Consumer is now running and listening for messages");
  } catch (error) {
    console.error("Error in consumer:", error);
  }
}

async function processBatch(batch) {
  console.log(`Processing batch of ${batch.length} messages`);
  try {
    const result = await DiceRoll.insertMany(batch, { ordered: false });
    console.log(`Successfully inserted ${result.length} messages`);
  } catch (error) {
    if (error instanceof mongoose.Error.BulkWriteError) {
      console.error(
        `Partially inserted ${error.insertedDocs.length} documents`
      );
      console.error("Error processing batch:", error.message);
    } else {
      console.error("Error processing batch:", error);
    }
  }
}

export default line;
