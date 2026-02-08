// 1. Component Interface
interface PaymentService {
    double pay(double amount);
}

// 2. Concrete Components
class CreditCardPayment implements PaymentService {
    @Override
    public double pay(double amount) {
        System.out.println("Thanh toán bằng thẻ tín dụng: " + amount);
        return amount;
    }
}

class PayPalPayment implements PaymentService {
    @Override
    public double pay(double amount) {
        System.out.println("Thanh toán bằng PayPal: " + amount);
        return amount;
    }
}

// 3. Decorator Abstract Class
abstract class PaymentDecorator implements PaymentService {
    protected PaymentService wrappedPayment;

    public PaymentDecorator(PaymentService payment) {
        this.wrappedPayment = payment;
    }

    @Override
    public double pay(double amount) {
        return wrappedPayment.pay(amount);
    }
}

// 4. Concrete Decorators
class ProcessingFeeDecorator extends PaymentDecorator {
    public ProcessingFeeDecorator(PaymentService payment) {
        super(payment);
    }

    @Override
    public double pay(double amount) {
        double fee = 5.0;
        System.out.println("Applying Processing Fee: +" + fee);
        return super.pay(amount + fee);
    }
}

class DiscountDecorator extends PaymentDecorator {
    public DiscountDecorator(PaymentService payment) {
        super(payment);
    }

    @Override
    public double pay(double amount) {
        double discount = 10.0;
        System.out.println("Applying Discount Code: -" + discount);
        return super.pay(amount - discount);
    }
}

// 5. Main Class
public class PaymentPattern {
    public static void main(String[] args) {

        System.out.println("--- Giao dịch 1: Thẻ tín dụng + Phí xử lý ---");
        PaymentService payment1 =
                new ProcessingFeeDecorator(new CreditCardPayment());
        payment1.pay(100.0);

        System.out.println("\n--- Giao dịch 2: PayPal + Phí xử lý + Mã giảm giá ---");
        PaymentService payment2 =
                new ProcessingFeeDecorator(
                        new DiscountDecorator(
                                new PayPalPayment()
                        )
                );
        payment2.pay(100.0);
    }
}

// Kết luận:
// Decorator Pattern cho phép "trang trí" thêm các tính năng (Phí, Giảm giá) vào đối tượng thanh toán gốc một cách động (dynamic) tại runtime.
// Tránh việc phải tạo quá nhiều lớp con kế thừa (ví dụ: không cần tạo class PayPalWithFeeAndDiscount), giúp code gọn gàng và tuân thủ nguyên tắc Single Responsibility.