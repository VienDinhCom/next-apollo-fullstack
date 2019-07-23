import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { dataSources } from './datasources';
import { utilities } from './utilities';

const server = new ApolloServer({
  schema,
  dataSources,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = utilities.auth.getUser(token);

    return { user };
  }
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`); // eslint-disable-line
  })
  .catch(error => {
    console.log(error); // eslint-disable-line
  });
