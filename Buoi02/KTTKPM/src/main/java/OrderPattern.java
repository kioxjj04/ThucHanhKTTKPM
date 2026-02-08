public class OrderPattern {
    // 1. Interface State
    interface OrderState {
        void handleRequest();
    }

    // 2. Concrete States (Các trạng thái cụ thể)
    static class NewState implements OrderState {
        @Override
        public void handleRequest() {
            System.out.println("Trạng thái Mới tạo: Đang kiểm tra thông tin đơn hàng...");
        }
    }

    static class ProcessingState implements OrderState {
        @Override
        public void handleRequest() {
            System.out.println("Trạng thái Đang xử lý: Đang đóng gói và vận chuyển...");
        }
    }

    static class DeliveredState implements OrderState {
        @Override
        public void handleRequest() {
            System.out.println("Trạng thái Đã giao: Cập nhật đơn hàng thành công.");
        }
    }

    static class CancelledState implements OrderState {
        @Override
        public void handleRequest() {
            System.out.println("Trạng thái Hủy: Hủy đơn hàng và hoàn tiền.");
        }
    }

    // 3. Context (Lớp Đơn hàng)
    static class Order {
        private OrderState state;

        public Order() {
            this.state = new NewState(); // Trạng thái mặc định
        }

        public void setState(OrderState state) {
            this.state = state;
        }

        public void processOrder() {
            state.handleRequest();
        }
    }

    // 4. Main Test

    public static void main(String[] args) {
        Order order = new Order();

        order.processOrder(); // Mặc định là NewState

        // Chuyển sang xử lý
        order.setState(new ProcessingState());
        order.processOrder();

        // Chuyển sang đã giao
        order.setState(new DeliveredState());
        order.processOrder();
    }
}

// Kết luận:
// State Pattern giúp loại bỏ các câu lệnh điều kiện phức tạp (if-else, switch-case) khi kiểm tra trạng thái đơn hàng.
// Mỗi trạng thái được đóng gói trong một lớp riêng biệt, giúp code dễ bảo trì và dễ dàng thêm trạng thái mới mà không sửa đổi code cũ (Open/Closed Principle).
