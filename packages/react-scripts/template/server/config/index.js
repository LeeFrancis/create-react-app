const appEnv = process.env.APP_ENV || 'localhost';
if (appEnv === 'localhost') {
  module.exports = require('./localhost');
} else if (appEnv === 'devqa') {
  module.exports = require('./devqa');
} else if (appEnv === 'integration') {
  module.exports = require('./integration');
} else if (appEnv === 'live') {
  module.exports = require('./live');
}
