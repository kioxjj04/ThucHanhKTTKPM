require('./services/inventory.service');
require('./services/payment.service');
require('./services/delivery.service');
require('./services/notification.service');
require('./orchestrator.service');

const orderService = require('./services/order.service');

setTimeout(() => {
  orderService.createOrder({
    id: Date.now(),
    items: ['apple', 'milk']
  });
}, 2000);