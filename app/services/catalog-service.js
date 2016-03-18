import serviceDiscovery from './service-discovery';

export default {
  getAllCds: () => {
    const catalogClient = serviceDiscovery.getClient('catalog-service', 'v2');
    return new Promise(function(resolve, reject) {
      catalogClient
        .get('/cds')
        .end(function (err, res) {
          if (res.body && res.body.length) {
            resolve(res.body);
          }
        });
      });
    }
};
