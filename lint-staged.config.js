module.exports = {
  '*.{js}': ['prettier --write', 'git add'],
  '*.{ts}': [
    'tslint -c tslint.json -p tsconfig.json --fix',
    'prettier --write',
    'tsc -p tsconfig.json --noEmit',
    'git add',
  ],
};
