// import { kafka } from "./client.js";

// let timesGenerate;


// async function init(times) {
//   const producer = kafka.producer();
//   try {
//     console.log("Connecting Producer...");
//     await producer.connect();
//     console.log("Producer Connected Successfully");

//     let sequence = 1;

//     async function generator() {
//       try {
//         sequence++;
//         const a = Math.floor(Math.random() * 6) + 1;
//         await producer.send({
//           topic: "dice-roll",
//           messages: [
//             {
//               key: "dice-output",
//               value: JSON.stringify({ sequence, output: a }),
//             },
//           ],
//         });
//         console.log(
//           `Message sent successfully: ${JSON.stringify({
//             sequence,
//             output: a,
//           })}`
//         );
//       } catch (err) {
//         console.error("Error sending message:", err);
//       }
//     }

//     timesGenerate = setInterval(generator, 1000);
//     setTimeout(() => {
//       clearInterval(timesGenerate);
//       console.log("finished");
//     }, 1000 *times);
//   } catch (err) {
//     console.error("Error connecting producer:", err);
//   }
// }

// const stop = ()=>{
//   clearInterval(timesGenerate)
// }

// export { init  , stop};


import { kafka } from "./client.js";

let timesGenerate = null;

async function init(times) {
  const producer = kafka.producer();
  try {
    console.log("Connecting Producer...");
    await producer.connect();
    console.log("Producer Connected Successfully");

    let sequence = 1;

    async function generator() {
      try {
        sequence++;
        const a = Math.floor(Math.random() * 6) + 1;
        await producer.send({
          topic: "dice-roll",
          messages: [
            {
              key: "dice-output",
              value: JSON.stringify({ sequence, output: a }),
            },
          ],
        });
        console.log(
          `Message sent successfully: ${JSON.stringify({
            sequence,
            output: a,
          })}`
        );
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }

    timesGenerate = setInterval(generator, 1000);
    setTimeout(() => {
      if (timesGenerate) {
        clearInterval(timesGenerate);
        timesGenerate = null;
      }
      console.log("finished");
    }, 1000 * times);
  } catch (err) {
    console.error("Error connecting producer:", err);
  }
}

const stop = () => {
  if (timesGenerate) {
    clearInterval(timesGenerate);
    timesGenerate = null;
    console.log("Stopped generator");
  }
};

export { init, stop };

