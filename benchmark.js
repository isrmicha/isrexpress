var siege = require('siege');
siege()
  .on(3000)
  .for(1000).times
  .get('/')
  .attack()