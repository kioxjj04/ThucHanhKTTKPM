const bus = require('../common/event-bus');

class NotificationService {
  constructor() {
    bus.subscribe('notify.user', this.notify.bind(this));
  }

  notify(order) {
    console.log(`📩 Notify user: Order ${order.id} completed`);
  }
}

module.exports = new NotificationService();