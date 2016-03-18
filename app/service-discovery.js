import agent from 'multiagent';

export default {

  getClient: (serviceName) => {
    const DISCOVERY_SERVERS = [
      'http://46.101.245.190:8500',
      'http://46.101.132.55:8500',
      'http://46.101.193.82:8500'
    ];

    return agent.client({
      discovery: 'consul',
      discoveryServers: DISCOVERY_SERVERS,
      discoveryStrategy: 'randomly',
      serviceName: serviceName,
      serviceStrategy: 'randomly'
    });
  }  
}
