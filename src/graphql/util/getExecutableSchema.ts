import { GraphQLSchema } from 'graphql';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

export default async function getExecutableSchema(): Promise<GraphQLSchema> {
  return makeExecutableSchema({
    typeDefs: importSchema('../../graphql/typeDefs/Query.graphql'),
  });
}
