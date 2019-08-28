import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import getExecutableSchema from './graphql/util/getExecutableSchema';

async function start() {
  const schema = await getExecutableSchema();
  const app = express();
  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({ app });
  const port = 3002;
  const host = 'localhost';
  app.listen({ port }, () => {
    /* tslint:disable no-console */
    console.info(
      `🚀 Apollo server available at ${host}:${port}${server.graphqlPath}`
    );
  });
}

/* tslint:disable no-floating-promises */
start();
