import { GraphQLSchema } from 'graphql';

import RootMutationType from './rootMutation.type.mjs';
import RootQueryType from './rootQuery.type.mjs';

const Schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

export default Schema;
