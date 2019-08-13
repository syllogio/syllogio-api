import { readFile } from 'fs-extra';
import { join } from 'path';
import { pipe } from 'ramda';

const read = async (relativePath: string): Promise<string> =>
  readFile(join(__dirname, relativePath), 'utf8');

export default Promise.all([
  read('./Query.graphql'),
  read('./Proposition.graphql'),
]);
