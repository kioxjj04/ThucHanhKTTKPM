const bus = require('../common/event-bus');

class OrderService {
  createOrder(order) {
    console.log('🛒 Order created:', order);
    bus.publish('order.created', order);
  }
}

module.exports = new OrderService();