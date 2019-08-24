import { allModules } from 'apollo-modulizer';

import { Query } from './query';
import { Mutation } from './mutation';
import { User } from './user';

export const { typeDefs, resolvers } = allModules([Query, Mutation, User]);
