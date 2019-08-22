import '~/backend/models';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs, resolvers } from '~/backend/schema';
import { dataSources } from './services';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
  // context: ({ req }) => {
  //   const token = req.headers.authorization || '';
  //   const user = utilities.auth.getUser(token);

  //   return { user };
  // }
});

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
// https://dev.to/hoangvvo/how-i-migrate-from-express-js-to-next-js-api-routes-4g5
