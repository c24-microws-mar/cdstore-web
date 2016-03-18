import serviceDiscovery from './service-discovery';

export default {
  addItem: (id) => {
    console.log("Trying to post to cart service with id", id);

    const cartClient = serviceDiscovery.getClient('cart-service');
    return new Promise(function(resolve, reject) {
      cartClient
        .post('/carts')
        .end(function (err, res) {
          console.log('done posting to cart service');
        });
      });
    }
}