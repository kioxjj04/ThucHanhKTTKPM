const bus = require('../common/event-bus');

class DeliveryService {
  constructor() {
    bus.subscribe('assign.delivery', this.assign.bind(this));
  }

  assign(order) {
    console.log('🚚 Assigning delivery...');
    bus.publish('delivery.assigned', order);
  }
}

module.exports = new DeliveryService();