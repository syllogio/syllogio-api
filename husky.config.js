module.exports = {
  hooks: {
    'pre-push': 'yarn test',
    'pre-commit': 'lint-staged',
  },
};
