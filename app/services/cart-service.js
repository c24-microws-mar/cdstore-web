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
          if (res.text && res.text.length) {
            //const cartId = JSON.stringify(res.text.cartId);
            //console.log('done posting to cart service.', cartId);
            //resolve(cartId);
            resolve(12345)
          } else {

          }
        });
      });
    }
}