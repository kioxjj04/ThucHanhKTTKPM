const bus = require('./common/event-bus');

class OrderOrchestrator {
  constructor() {
    bus.subscribe('order.created', this.start.bind(this));

    bus.subscribe('inventory.reserved', this.nextPayment.bind(this));
    bus.subscribe('inventory.failed', this.fail.bind(this));

    bus.subscribe('payment.completed', this.nextDelivery.bind(this));
    bus.subscribe('payment.failed', this.rollback.bind(this));

    bus.subscribe('delivery.assigned', this.complete.bind(this));
  }

  start(order) {
    console.log('🚀 Saga started');
    bus.publish('reserve.inventory', order);
  }

  nextPayment(order) {
    bus.publish('process.payment', order);
  }

  nextDelivery(order) {
    bus.publish('assign.delivery', order);
  }

  rollback(order) {
    console.log('❌ Payment failed → rollback inventory');
    bus.publish('release.inventory', order);
    this.fail(order);
  }

  complete(order) {
    console.log('✅ Order completed');
    bus.publish('notify.user', order);
  }

  fail(order) {
    console.log('❌ Order failed');
  }
}

module.exports = new OrderOrchestrator();