const execAsync = require('./execAsync');
const log = require('./log');

/**
 * Helper that determines whether or not gremlin has been initialized.
 *
 * @param {string} containerName - Name of the container that should be checked for initialization.
 *
 * @returns {boolean} - Boolean indicating whether or not gremlin has been initialized.
 */
const isInitialized = async containerName => {
  let output;
  try {
    output = !!(await execAsync(
      `docker inspect -f '{{.Id}}' ${containerName}`
    ));
  } catch {
    output = false;
  }

  return output;
};

/**
 * Start a gremlin container.
 *
 * @param {string} containerName - Name of the container on which the action should be performed.
 * @param {number} port - The port number to expose.
 *
 * @returns {undefined} nothing.
 */
module.exports.start = async (containerName, port) => {
  if (!(await isInitialized(containerName))) {
    log(
      'info',
      `Docker container ${containerName} has not yet been initialized. Starting initialization now...`
    );
    await execAsync(
      `docker run -d -p ${port}:8182 --name ${containerName} tinkerpop/gremlin-server`
    );
  }

  log('info', `Starting Docker container ${containerName}`);
  await execAsync(`docker container start ${containerName}`);
};

/**
 * Stop a gremlin container.
 *
 * @param {string} containerName - Name of the container on which the action should be performed.
 *
 * @returns {undefined} nothing.
 */
module.exports.stop = async containerName => {
  log('info', `Stopping Docker container ${containerName}`);
  await execAsync(`docker container stop ${containerName}`);
};
