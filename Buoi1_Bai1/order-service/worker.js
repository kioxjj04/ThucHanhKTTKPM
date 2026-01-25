const { connectRabbit, QUEUE_NAME } = require("./rabbitmq");

async function start() {
  const { channel } = await connectRabbit();

  channel.consume(QUEUE_NAME, async (msg) => {
    const data = JSON.parse(msg.content.toString());

    console.log("📨 Sending email:", data);

    // giả lập gửi email chậm
    await new Promise(r => setTimeout(r, 5000));

    console.log("✅ Email sent to", data.email);

    channel.ack(msg);
  });
}

start();
