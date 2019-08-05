const gremlin = require('./scripts/lib/gremlin');
const got = require('got');

const CONTAINER_NAME = 'syllogio_gremlin_test';

/**
 * Returns true if the gremlin service is ready for connections
 */
const gremlinIsRunning = async () => {
  try {
    await got(`http://localhost:${process.env.GREMLIN_PORT}/gremlin`);
    return true;
  } catch (error) {
    // Before the service is up and running we get a RequestError. If we have an
    // HTTPError, the service is up and running. This is, admittedly, a little
    // strange. It relies on the fact that the tinkerpop container is not
    // configured to accept HTTP requests so it returns an HTTP error when the
    // server is running and ready. It would be ideal to use websockets to
    // verify service readiness by connecting, but using a websocket client
    // results in the whole process being exited when trying to connect
    // prematurely, so this was a better alternative.
    return error.name === 'HTTPError';
  }
};

/**
 * Wait for the gremlin service to be running.
 */
const waitForGremlin = async () => {
  while (!(await gremlinIsRunning())) {}
};

/**
 * Stop the test container if it is already running, then start it and wait for
 * it to be ready before tests begin.
 */
module.exports = async () => {
  await gremlin.stop(CONTAINER_NAME);
  await gremlin.start(CONTAINER_NAME, process.env.GREMLIN_PORT);
  await waitForGremlin();
};
