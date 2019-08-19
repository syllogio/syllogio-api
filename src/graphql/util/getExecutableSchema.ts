import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../typeDefs';

export default async function getExecutableSchema(): Promise<GraphQLSchema> {
  return makeExecutableSchema({
    typeDefs,
  });
}
