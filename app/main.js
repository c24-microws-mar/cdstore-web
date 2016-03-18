import $ from 'jquery';
import agent from 'multiagent';
import cdStoreService from './cd-store-service';

const DISCOVERY_SERVERS = [
  'http://46.101.245.190:8500',
  'http://46.101.132.55:8500',
  'http://46.101.193.82:8500'
];

const client = agent.client({
  discovery: 'consul',
  discoveryServers: DISCOVERY_SERVERS,
  discoveryStrategy: 'randomly',
  serviceName: 'example-service',
  serviceStrategy: 'randomly'
});

// client.get('/superstars').end(function (err, res) {
//   if (res.body && res.body.length)
//     res.body.forEach(superstar => $('<p></p>').text(superstar).appendTo('body'));
// });

cdStoreService.getAllCds().then(cdList => {
  cdList.forEach(cd => {
    const line = $('<div></div>').appendTo('body')

    $('<span></span>').text(cd.name).appendTo(line)
    $('<span></span>').text(cd.price).appendTo(line)
  });
});
