import { utils } from '~/backend/utils';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs, resolvers } from '~/backend/modules';

utils.db.init();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization;
    const user = await utils.auth.getUser(token);

    return { user };
  }
});

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
// https://dev.to/hoangvvo/how-i-migrate-from-express-js-to-next-js-api-routes-4g5
// https://medium.com/@mattmazzola/graphql-pagination-implementation-8604f77fb254
