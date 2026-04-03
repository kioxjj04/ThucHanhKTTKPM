const bus = require('../common/event-bus');

class PaymentService {
  constructor() {
    bus.subscribe('process.payment', this.pay.bind(this));
  }

  pay(order) {
    console.log('💳 Processing payment...');

    const success = Math.random() > 0.3;

    if (success) {
      bus.publish('payment.completed', order);
    } else {
      bus.publish('payment.failed', order);
    }
  }
}

module.exports = new PaymentService();