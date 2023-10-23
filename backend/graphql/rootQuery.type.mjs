import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import codesService from '../services/codes.service.mjs';
import delayedService from '../services/delayed.service.mjs';
import ticketsService from '../services/tickets.service.mjs';
import usersService from '../services/users.service.mjs';
import CodeType from './code/code.type.mjs';
import DelayedTrainType from './delayedTrain/delayedTrain.type.mjs';
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
                try {
                    const response = await codesService.fetchCodes();
                    return response.RESPONSE.RESULT[0].ReasonCode;
                } catch (e) {
                    throw new Error(`Failed to get codes: ${e}`);
                }
            },
        },
        delayed: {
            type: new GraphQLList(DelayedTrainType),
            description: 'List of all delayed trains',
            resolve: async () => {
                try {
                    const trains = await delayedService.fetchDelayedTrains();
                    return trains.RESPONSE.RESULT[0].TrainAnnouncement;
                } catch (e) {
                    throw new Error(`Failed to get delayed trains: ${e}`);
                }
            },
        },
        tickets: {
            type: new GraphQLList(TicketType),
            description: 'List of all tickets',
            resolve: async (_, __, context) => {
                if (context.user == null) {
                    throw new Error('Unauthorized');
                }
                try {
                    return await ticketsService.getTickets();
                } catch (e) {
                    throw new Error(`Failed to get tickets: ${e}`);
                }
            },
        },
        user: {
            type: UserType,
            description: 'A single user',
            args: {
                email: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                try {
                    return await usersService.findUserByEmail(args.email);
                } catch (e) {
                    throw new Error(
                        `Failed to get user with email ${args.email}: ${e}`,
                    );
                }
            },
        },
    }),
});

export default RootQueryType;
