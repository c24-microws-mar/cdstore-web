import serviceDiscovery from './service-discovery';

export default {
  getSuggestions: (albumId) => {
    const suggestionsClient = serviceDiscovery.getClient('suggestions-service', 'v2');
    return new Promise(function(resolve, reject) {
      suggestionsClient
        .get('/suggestions')
        .end(function (err, res) {
          if (res.body && res.body.length) {
            resolve(res.body);
          }
        });
      });
    }
};
