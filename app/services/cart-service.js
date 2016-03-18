import serviceDiscovery from './service-discovery';

export default {
  addItem: (id) => {
    console.log("Trying to post to cart service with id", id);

    const cartClient = serviceDiscovery.getClient('cart-service');
    return new Promise(function(resolve, reject) {
      cartClient
        .post('/carts')
        .send({ 'itemId': id, count: 1 })
        .end(function (err, res) {
          if (res.body && res.body.length) {
            console.log('done posting to cart service. CartId', cartId);
            resolve(res.body.cartId);
          }
        });
      });
    }
}