const bus = require('../common/event-bus');

class InventoryService {
  constructor() {
    bus.subscribe('reserve.inventory', this.reserve.bind(this));
    bus.subscribe('release.inventory', this.release.bind(this));
  }

  reserve(order) {
    console.log('📦 Reserving inventory...');

    const success = Math.random() > 0.2;

    if (success) {
      bus.publish('inventory.reserved', order);
    } else {
      bus.publish('inventory.failed', order);
    }
  }

  release(order) {
    console.log('♻️ Releasing inventory...');
  }
}

module.exports = new InventoryService();