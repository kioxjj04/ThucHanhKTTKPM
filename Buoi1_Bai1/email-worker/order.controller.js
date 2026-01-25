const { connectRabbit, QUEUE_NAME } = require("./rabbitmq");
const { v4: uuid } = require("uuid");

async function createOrder(req, res) {
  const orderId = uuid();
  const email = req.body.email;

  // 1. Giả lập ghi DB
  console.log("Order created:", orderId);

  // 2. Đẩy job gửi email
  const { channel } = await connectRabbit();
  channel.sendToQueue(
    QUEUE_NAME,
    Buffer.from(JSON.stringify({ orderId, email })),
    { persistent: true }
  );

  res.json({
    message: "Order created successfully",
    orderId
  });
}

module.exports = { createOrder };
