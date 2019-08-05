const { gremlin } = require('./scripts/lib');

module.exports = async () =>
  gremlin.stop('syllogio_gremlin_test', process.env.GREMLIN_PORT);
