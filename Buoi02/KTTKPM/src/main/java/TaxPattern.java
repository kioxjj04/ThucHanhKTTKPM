// 1. Strategy Interface
interface TaxStrategy {
    double calculateTax(double price);
}

// 2. Concrete Strategies
class VATStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return price * 0.10; // 10% VAT
    }
}

class ConsumptionTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return price * 0.05; // 5% Thuế tiêu thụ
    }
}

class LuxuryTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return price * 0.20; // 20% Thuế hàng xa xỉ
    }
}

// 3. Context
class Product {
    private String name;
    private double price;
    private TaxStrategy taxStrategy;

    public Product(String name, double price, TaxStrategy taxStrategy) {
        this.name = name;
        this.price = price;
        this.taxStrategy = taxStrategy;
    }

    public double getFinalPrice() {
        double tax = taxStrategy.calculateTax(price);
        return price + tax;
    }

    public void setTaxStrategy(TaxStrategy taxStrategy) {
        this.taxStrategy = taxStrategy;
    }

    public String getName() {
        return name;
    }
}

// 4. Main
public class TaxPattern {
    public static void main(String[] args) {

        Product milk = new Product("Sữa", 100.0, new VATStrategy());
        System.out.println("Giá " + milk.getName() + " (trước tax): " + (milk.getFinalPrice() - milk.getFinalPrice() * 0.10));
        System.out.println("Giá " + milk.getName() + " (VAT): " + milk.getFinalPrice());

        Product diamond = new Product("Kim cương", 1000.0, new LuxuryTaxStrategy());
        System.out.println("Giá " + diamond.getName() + " (trước tax): " + (diamond.getFinalPrice() - diamond.getFinalPrice() * 0.20));
        System.out.println("Giá " + diamond.getName() + " (Luxury Tax): " + diamond.getFinalPrice());

        // Đổi chiến lược thuế lúc runtime
        milk.setTaxStrategy(new ConsumptionTaxStrategy());
        System.out.println("Giá Sữa (Consumption Tax): " + milk.getFinalPrice());
    }
}

// Kết luận:
// Strategy Pattern cho phép tách biệt logic tính toán (thuế) ra khỏi đối tượng sử dụng (Sản phẩm).
// Người dùng có thể linh hoạt thay đổi cách tính thuế cho sản phẩm mà không cần sửa đổi class Product.
