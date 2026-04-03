# Buoi05 — Hướng dẫn chạy project

Ứng dụng minh hoạ pattern Saga bằng event bus (Redis) — nhiều service nội bộ chạy trong cùng một process và giao tiếp qua Redis pub/sub.

**Yêu cầu**
- Docker & Docker Compose (khuyến nghị)
- Node.js >= 18 và `npm` (nếu chạy local)

**Chạy nhanh (Khuyến nghị — Docker Compose)**

1. Build và chạy toàn bộ (Redis + app):

```bash
docker-compose up --build
```

2. Chạy ở background:

```bash
docker-compose up -d --build
```

3. Xem logs:

```bash
docker-compose logs -f
```

4. Dừng và xoá container:

```bash
docker-compose down
```

**Chạy local bằng Node (chỉ dành cho phát triển, có lưu ý)**

1. Cài dependency:

```bash
npm install
```

2. Chạy:

```bash
npm start
```

LƯU Ý: `common/event-bus.js` hiện tại kết nối tới `redis://redis:6379`. Nếu bạn chạy app trực tiếp trên máy (không trong container), hostname `redis` sẽ không tồn tại. Có hai lựa chọn:

- Chạy một Redis container và chỉnh cấu hình mạng cho app để kết nối tới nó (khuyến nghị dùng `docker-compose`).
- Hoặc chỉnh `common/event-bus.js` để dùng biến môi trường `REDIS_URL` hoặc `localhost`. Ví dụ thay thế:

```js
const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';
const pub = redis.createClient({ url: REDIS_URL });
const sub = redis.createClient({ url: REDIS_URL });
```

Ví dụ khởi chạy Redis nhanh trên máy (local):

```bash
docker run -d --name redis -p 6379:6379 redis:7
```

Sau đó chỉnh `common/event-bus.js` để dùng `redis://localhost:6379`, hoặc đặt `REDIS_URL` trước khi `npm start`:

```bash
export REDIS_URL=redis://localhost:6379
npm start
```

**Xây image và chạy thủ công (không dùng docker-compose)**

```bash
docker build -t buoi05:latest .
docker network create buoi05-net
docker run -d --name redis --network buoi05-net redis:7
docker run --rm --name buoi05 --network buoi05-net buoi05:latest
```

**Thông tin nhanh từ repo**
- Start script: `npm start` (thực thi `node index.js`).
- Dockerfile dùng `node:18-alpine` và sẽ cài dependency từ `package*.json`.
- Redis được dùng làm event bus (pub/sub) theo `common/event-bus.js`.
- Các service chính nằm trong thư mục `services/` và `orchestrator.service.js` điều phối các event.

**Các lệnh hữu ích**
- Xem container đang chạy: `docker ps`
- Xem logs của service app (khi dùng docker-compose): `docker-compose logs -f app`

Nếu bạn muốn, tôi có thể:
- Thêm hướng dẫn chạy từng service riêng lẻ,
- Hoặc tạo một bản `env.example` / cập nhật `common/event-bus.js` để dùng `REDIS_URL`.
