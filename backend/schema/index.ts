import { allModules } from 'apollo-modulizer';

import User from './user.schema';
import Post from './post.schema';
import Query from './query.schema';
import Mutation from './mutation.schema';

export const { typeDefs, resolvers } = allModules([Query, Mutation, User, Post]);
