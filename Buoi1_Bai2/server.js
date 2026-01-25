const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

const QUEUE_NAME = 'flash_sale_orders';
let channel, connection;

// Kết nối RabbitMQ một lần khi khởi động Server
async function connectRabbitMQ() {
    try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        // durable: true để đảm bảo hàng đợi không mất khi RabbitMQ restart
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log("✅ Đã kết nối RabbitMQ - Sẵn sàng nhận đơn!");
    } catch (error) {
        console.error("Lỗi kết nối RabbitMQ:", error);
    }
}
connectRabbitMQ();

// API Đặt vé (Mô phỏng chịu tải 10k request)
app.post('/buy', async (req, res) => {
    const { userId, productId } = req.body;

    const orderData = { userId, productId, timestamp: Date.now() };

    // 1. Đẩy vào hàng đợi (Buffer)
    // SendToQueue trả về true/false, bản chất là bất đồng bộ rất nhanh
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(orderData)), {
        persistent: true // Lưu message vào ổ cứng phòng khi RabbitMQ sập
    });

    // 2. Phản hồi NGAY LẬP TỨC (Không chờ DB)
    // Lúc này đơn hàng chưa thực sự thành công, chỉ là "đã ghi nhận"
    return res.status(202).json({
        message: 'Đơn hàng đang được xử lý. Vui lòng chờ thông báo!',
        status: 'queued'
    });
});

app.listen(3000, () => {
    console.log('🚀 Server chạy tại port 3000');
});