module.exports = {
  hooks: {
    'pre-push': 'yarn test',
    'pre-commit': 'yarn lint',
  },
};
