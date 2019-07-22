const { execSync } = require('child_process');

/**
 * Utility method that logs messages to the console.
 *
 * @param {string} method - String depicting the log method (debug, info, error, etc).
 */
const log = (method = 'log', ...args) => {
  const func = typeof console[method] === 'function' ? method : 'log';
  console[func](...args);
};

/**
 * Helper that determines whether or not gremlin has been initialized.
 *
 * @param {string} container - Name of the container that should be checked for initialization.
 *
 * @returns {boolean} - Boolean indicating whether or not gremlin has been initialized.
 */
const isInitialized = container => {
  let output;
  try {
    output = !!execSync(`docker inspect -f '{{.Id}}' ${container}`);
  } catch {
    output = false;
  }

  return output;
};

/**
 * Helper that can start and stop a gremlin container.
 *
 * @param {string} action - Action that should be executed. Can be "start" or "stop".
 * @param {string} container - Name of the container on which the action should be performed.
 *
 * @returns {undefined} nothing.
 */
const gremlin = (action, container) => {
  const validActions = ['start', 'stop'];

  if (!action || !validActions.includes(action)) {
    throw new Error(
      'Invalid command. You must pass either "start" or "stop" to this script.'
    );
  }

  if (action === 'start') {
    if (!isInitialized(container)) {
      log(
        'info',
        `Docker container ${container} has not yet been initialized. Starting initialization now...`
      );
      execSync(
        `docker run -d -p 3182:8182 --name ${container} tinkerpop/gremlin-server`
      );
    }

    log('info', `Starting Docker container ${container}`);
    execSync(`docker container start ${container}`);
  }

  if (action === 'stop') {
    log('info', `Stopping Docker container ${container}`);
    execSync(`docker container stop ${container}`);
  }
};

gremlin(process.argv[2], 'syllogio_gremlin');
