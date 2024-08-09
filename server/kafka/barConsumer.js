import { io } from "../index.js";
import { kafka } from "./client.js";
import mongoose from "mongoose";

import DiceStats from "../model/dicestats.js";

async function bar() {
  const consumer = kafka.consumer({ groupId: "bar" });

  let diceStats = await DiceStats.findOne();
  if (!diceStats) {
    diceStats = new DiceStats({
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      total: 0,
    });
    await diceStats.save();
  }

  sendStatsToClient(diceStats);

  const outputMap = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
  };

  try {
    await consumer.connect();
    console.log("Consumer connected successfully");

    await consumer.subscribe({ topics: ["dice-roll"], fromBeginning: true });
    console.log("Subscribed to topic 'dice-roll'");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageValue = JSON.parse(message.value.toString());
        console.log("Received message:", messageValue);

        const output = messageValue.output;
        const statKey = outputMap[output];

        if (statKey) {
          diceStats[statKey]++;
          diceStats.total++;
          if (diceStats.total % 10 === 0) {
            console.log("Saving stats...");
            await diceStats.save();
          }

          sendStatsToClient(diceStats);
        } else {
          console.error("Invalid output value:", output);
        }
      },
    });

    console.log("Consumer is now running and listening for messages");
  } catch (error) {
    console.error("Error in consumer:", error);
  }
}

function sendStatsToClient(diceStats) {
  if (io && typeof io.emit === "function") {
    io.emit("DICE_STATS", {
      one: diceStats.one,
      two: diceStats.two,
      three: diceStats.three,
      four: diceStats.four,
      five: diceStats.five,
      six: diceStats.six,
      total: diceStats.total,
    });

  } else {
    console.error("io object is not properly initialized");
  }
}

export default bar;
