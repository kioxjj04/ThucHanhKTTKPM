const amqp = require('amqplib');

const QUEUE_NAME = 'flash_sale_orders';

async function startWorker() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        // QUAN TRỌNG: Prefetch = 1 (Hoặc số nhỏ tùy năng lực DB)
        // Nghĩa là: "Chỉ đưa cho tôi 1 tin nhắn, khi nào tôi xử lý xong (ack) thì mới đưa tin tiếp theo"
        // Đây chính là cách điều tiết tốc độ (Throttling).
        channel.prefetch(1); 

        console.log("👷 Worker đang chạy... Đang chờ đơn hàng...");

        // Lắng nghe hàng đợi
        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const orderData = JSON.parse(msg.content.toString());
                
                // --- BẮT ĐẦU GIẢ LẬP XỬ LÝ DB ---
                // Giả sử DB mất 30ms để xử lý 1 đơn (tương đương ~2000 req/phút nếu chạy 1 worker)
                await simulateDatabaseProcessing(30); 
                
                // Logic kiểm tra tồn kho & tạo đơn hàng thật ở đây
                console.log(`✅ Đã xử lý xong đơn cho User ${orderData.userId}`);

                // --- KẾT THÚC ---

                // Báo cho RabbitMQ biết là đã xong, có thể xóa message này và gửi message tiếp theo
                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error(error);
    }
}

// Hàm giả lập độ trễ của Database
function simulateDatabaseProcessing(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

startWorker();  