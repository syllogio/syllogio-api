import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import getExecutableSchema from './util/getExecutableSchema';

async function start() {
  const schema = await getExecutableSchema();
  const app = express();
  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({ app });
  app.listen({ port: 3002 }, () => {
    console.info(
      `🚀 Apollo server available at {host}:4000/${server.graphqlPath}`
    );
  });
}

start();
