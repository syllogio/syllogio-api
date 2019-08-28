import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from '../resolvers';
import typeDefs from '../typeDefs';

export default async function getExecutableSchema(): Promise<GraphQLSchema> {
  return makeExecutableSchema({
    resolvers,
    typeDefs,
  });
}
