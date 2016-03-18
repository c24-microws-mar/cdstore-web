import agent from 'multiagent';

export default {

  getClient: (serviceName, tag) => {
    const DISCOVERY_SERVERS = [
      'http://46.101.245.190:8500',
      'http://46.101.132.55:8500',
      'http://46.101.193.82:8500'
    ];

    const options = {
      discovery: 'consul',
      discoveryServers: DISCOVERY_SERVERS,
      discoveryStrategy: 'randomly',
      serviceName: serviceName,
      serviceStrategy: 'randomly'
    };

    if (tag) {
      options.createConsulRequestPath = serviceName => `/v1/health/service/${encodeURIComponent(serviceName)}?passing=true&tag=${tag}`
    }

    return agent.client(options);
  }  
}
