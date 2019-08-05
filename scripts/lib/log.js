/**
 * Utility method that logs messages to the console.
 *
 * @param {string} method - String depicting the log method (debug, info, error, etc).
 */
module.exports = (method = 'log', ...args) => {
  const func = typeof console[method] === 'function' ? method : 'log';
  console.log('\n');
  console[func](...args);
  console.log('\n');
};
