import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = importSchema(`${__dirname}/typeDefs.graphql`);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
