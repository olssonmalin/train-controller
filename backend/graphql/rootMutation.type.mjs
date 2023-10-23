import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';

import ticketsService from '../services/tickets.service.mjs';
import usersService from '../services/users.service.mjs';
import jwtUtils from '../utils/jwt.mjs';
import ticketLocks from '../utils/ticketLocks.mjs';
import AuthInputType from './auth/authInput.type.mjs';
import LoginResultType from './auth/loginResult.type.mjs';
import RegisterResultType from './auth/registerResult.type.mjs';
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
            resolve: async (_, { input }, context) => {
                if (context.user == null) {
                    throw new Error('Unauthorized');
                }
                const newTicket = {
                    code: input.code,
                    trainnumber: input.trainnumber,
                    traindate: input.traindate,
                };

                try {
                    const result = await ticketsService.createTicket(newTicket);

                    if (result.acknowledged) {
                        return {
                            message: 'Ticket created successfully',
                            ticketId: result.insertedId.toString(),
                            success: true,
                        };
                    } else {
                        throw new Error('Failed to create a new ticket');
                    }
                } catch (error) {
                    throw new Error('Failed to create a new ticket');
                }
            },
        },
        deleteTicket: {
            type: TicketUpdateResultType,
            description: 'Delete a ticket',
            args: {
                ticketId: { type: GraphQLString },
            },
            resolve: async (_, { ticketId }, context) => {
                if (context.user == null) {
                    throw new Error('Unauthorized');
                }

                if (
                    ticketLocks.isTicketLocked(ticketId) &&
                    ticketLocks.getLockingUser(ticketId) !== context.user.userId
                ) {
                    throw new Error('Ticket is locked by someone else.');
                }

                try {
                    const deleted = await ticketsService.deleteTicket(ticketId);

                    if (deleted) {
                        return {
                            message: 'Ticket deleted successfully',
                            success: true,
                        };
                    } else {
                        throw new Error('Failed to delete the ticket');
                    }
                } catch (error) {
                    throw new Error('Failed to delete the ticket');
                }
            },
        },
        login: {
            type: LoginResultType,
            description: 'User log in',
            args: {
                input: { type: AuthInputType },
            },
            resolve: async (_, { input }) => {
                const existingUser = await usersService.findUserByEmail(
                    input.email,
                );
                if (existingUser == null) {
                    // look into returning token "" and success: false
                    throw new Error('Invalid login credentials.');
                }
                const validPassword = await jwtUtils.verifyPassword(
                    input.password,
                    existingUser.password,
                );
                if (!validPassword) {
                    // look into returning token "" and success: false
                    throw new Error('Invalid login credentials.');
                }
                const token = jwtUtils.generateToken(existingUser);
                return {
                    token,
                    success: true,
                };
            },
        },
        register: {
            type: RegisterResultType,
            description: 'User register',
            args: {
                input: { type: AuthInputType },
            },
            resolve: async (_, { input }) => {
                const existingUser = await usersService.findUserByEmail(
                    input.email,
                );
                if (existingUser != null) {
                    throw new Error('Email already registered.');
                }

                const user = await usersService.createUser({
                    email: input.email,
                    password: input.password,
                });
                if (user == null) {
                    throw new Error('User could not be registered.');
                }

                return {
                    success: true,
                };
            },
        },
        updateTicket: {
            type: TicketUpdateResultType,
            description: 'Update a ticket',
            args: {
                input: { type: TicketUpdateInputType },
            },
            resolve: async (_, { input }, context) => {
                if (context.user == null) {
                    throw new Error('Unauthorized');
                }

                if (
                    ticketLocks.isTicketLocked(input._id) &&
                    ticketLocks.getLockingUser(input._id) !==
                        context.user.userId
                ) {
                    throw new Error('Ticket is locked by someone else.');
                }

                try {
                    const result = await ticketsService.updateTicket(input);

                    if (result) {
                        return {
                            message: `Ticket with ID ${input._id} has been updated.`,
                            success: true,
                        };
                    } else {
                        throw new Error(`No matching ticket found for update.`);
                    }
                } catch (error) {
                    throw new Error('Failed to update the ticket');
                }
            },
        },
    }),
});

export default RootMutationType;
