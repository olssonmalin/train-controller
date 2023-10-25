import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';

import ticketsService from '../services/tickets.service.mjs';
import usersService from '../services/users.service.mjs';
import jwtUtils from '../utils/jwt.mjs';
import ticketLocks from '../utils/ticketLocks.mjs';
import AuthInputType from './auth/authInput.type.mjs';
import LoginResultType from './auth/loginResult.type.mjs';
import RegisterResultType from './auth/registerResult.type.mjs';
import {
    createTicket,
    deleteTicket,
    login,
    register,
    updateTicket,
} from './resolvers.mjs';
import TicketCreationResultType from './ticket/ticketCreationResult.type.mjs';
import TicketInputType from './ticket/ticketInput.type.mjs';
import TicketUpdateInputType from './ticket/ticketUpdateInput.type.mjs';
import TicketUpdateResultType from './ticket/ticketUpdateResult.type.mjs';

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: () => ({
        createTicket: {
            type: TicketCreationResultType,
            description: 'Create a new ticket',
            args: {
                input: { type: TicketInputType },
            },
            resolve: async (_, input, context) => {
                return await createTicket(input, context);
            },
        },
        deleteTicket: {
            type: TicketUpdateResultType,
            description: 'Delete a ticket',
            args: {
                ticketId: { type: GraphQLString },
            },
            resolve: async (_, ticketId, context) => {
                return await deleteTicket(ticketId, context);
            },
        },
        login: {
            type: LoginResultType,
            description: 'User log in',
            args: {
                input: { type: AuthInputType },
            },
            resolve: async (_, input) => {
                return await login(input);
            },
        },
        register: {
            type: RegisterResultType,
            description: 'User register',
            args: {
                input: { type: AuthInputType },
            },
            resolve: async (_, input) => {
                return await register(input);
            },
        },
        updateTicket: {
            type: TicketUpdateResultType,
            description: 'Update a ticket',
            args: {
                input: { type: TicketUpdateInputType },
            },
            resolve: async (_, input, context) => {
                return await updateTicket(input, context);
            },
        },
    }),
});

export default RootMutationType;
