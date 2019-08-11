module.exports = {
  hooks: {
    'pre-push': 'yarn test',
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
