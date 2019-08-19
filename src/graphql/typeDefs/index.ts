import { importSchema } from 'graphql-import';
import { join } from 'path';

const typeDefs = importSchema(join(__dirname, './Query.graphql'));

export default typeDefs;
