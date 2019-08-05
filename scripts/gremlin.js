const { gremlin } = require('./lib');

const VALID_ACTIONS = ['start', 'stop'];

const action = process.argv[2];

if (!VALID_ACTIONS.includes(action)) {
  throw new Error(
    `Invalid command. You must pass one of the following arguments to this script: "${VALID_ACTIONS.join(
      '", "'
    )}"`
  );
}

gremlin[action]('syllogio_gremlin', 8182);
