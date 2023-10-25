import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import CodeType from './code/code.type.mjs';
import DelayedTrainType from './delayedTrain/delayedTrain.type.mjs';
import {
    getCodes,
    getDelayedTrains,
    getTickets,
    getUser,
} from './resolvers.mjs';
import TicketType from './ticket/ticket.type.mjs';
import UserType from './user/user.type.mjs';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        codes: {
            type: new GraphQLList(CodeType),
            description: 'List of all codes',
            resolve: async () => {
                return await getCodes();
            },
        },
        delayed: {
            type: new GraphQLList(DelayedTrainType),
            description: 'List of all delayed trains',
            resolve: async () => {
                return await getDelayedTrains();
            },
        },
        tickets: {
            type: new GraphQLList(TicketType),
            description: 'List of all tickets',
            resolve: async (_, __, context) => {
                return await getTickets(context);
            },
        },
        user: {
            type: UserType,
            description: 'A single user',
            args: {
                email: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                return await getUser(args);
            },
        },
    }),
});

export default RootQueryType;
