import serviceDiscovery from './service-discovery';

export default {
  sendNotification: (person, cart_id) => {
    const notificationClient = serviceDiscovery.getClient('notification-service');
    return new Promise(function(resolve, reject) {
      notificationClient
        .post('/order-notification')
        .end(function (err, res) {
        });
      });
    }
}