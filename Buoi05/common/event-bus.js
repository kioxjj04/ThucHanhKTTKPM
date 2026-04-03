const redis = require('redis');

const pub = redis.createClient({ url: 'redis://redis:6379' });
const sub = redis.createClient({ url: 'redis://redis:6379' });

(async () => {
  await pub.connect();
  await sub.connect();
})();

module.exports = {
  publish: async (event, data) => {
    console.log(`[EVENT] ${event}`, data);
    await pub.publish(event, JSON.stringify(data));
  },

  subscribe: async (event, handler) => {
    await sub.subscribe(event, (message) => {
      handler(JSON.parse(message));
    });
  }
};