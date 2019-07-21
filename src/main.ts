import { ApolloServer } from 'apollo-server';
import utilities from './utilities';
import schema from './schema';

const server = new ApolloServer({
  schema,
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
