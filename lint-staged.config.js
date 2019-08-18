module.exports = {
  '*.{js}': ['prettier --write', 'git add'],
  '*.{ts}': [
    'tslint -c tslint.json -p tsconfig.json --fix',
    'prettier --write',
    // lint-staged passes files as arguments to the script. We just want to
    // compile the whole project. Nesting inside `bash -c ""` ignores the files.
    'bash -c "tsc -p tsconfig.json --noEmit"',
    'git add',
  ],
};
