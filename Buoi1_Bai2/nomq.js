const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 👇 DÁN CHUỖI KẾT NỐI MỚI VÀO ĐÂY
const uri = "mongodb+srv://admin:123456az@cluster0.t6y9usu.mongodb.net/flashsale_db?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log("✅ Đã kết nối MongoDB Atlas thành công!"))
    .catch(err => console.error("❌ Lỗi kết nối:", err));

// ... (Phần còn lại của code giữ nguyên) ...

const productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    stock: Number
});
const Product = mongoose.model('Product', productSchema);

// API mua hàng
app.post('/buy', async (req, res) => {
    try {
        const { productId } = req.body;
        const result = await Product.findOneAndUpdate(
            { _id: productId, stock: { $gt: 0 } },
            { $inc: { stock: -1 } }
        );

        if (result) {
            return res.status(200).json({ msg: "Mua thành công!" });
        } else {
            return res.status(400).json({ msg: "Hết hàng hoặc lỗi!" });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Lỗi server" });
    }
});

// API tạo dữ liệu mẫu (Chạy cái này trước để có hàng trong kho)
app.post('/init-product', async (req, res) => {
    try {
        await Product.create({ _id: "IPHONE_15", name: "iPhone 15 Pro", stock: 100 });
        res.send("Đã tạo iPhone 15 với 100 tồn kho.");
    } catch (e) {
        res.send("Sản phẩm đã tồn tại hoặc lỗi: " + e.message);
    }
});

app.listen(3000, () => {
    console.log('🚀 Server đang chạy port 3000');
});