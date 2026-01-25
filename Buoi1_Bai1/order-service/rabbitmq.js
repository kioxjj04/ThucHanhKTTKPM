const amqp = require("amqplib");

const QUEUE_NAME = "SEND_EMAIL_QUEUE";

async function connectRabbit() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  return { channel };
}

module.exports = { connectRabbit, QUEUE_NAME };
