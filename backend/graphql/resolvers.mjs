import codesService from '../services/codes.service.mjs';
import delayedService from '../services/delayed.service.mjs';
import ticketsService from '../services/tickets.service.mjs';
import usersService from '../services/users.service.mjs';
import jwtUtils from '../utils/jwt.mjs';
import ticketLocks from '../utils/ticketLocks.mjs';

export async function getCodes() {
    try {
        const response = await codesService.fetchCodes();
        return response.RESPONSE.RESULT[0].ReasonCode;
    } catch (e) {
        throw new Error(`Failed to get codes: ${e}`);
    }
}

export async function getDelayedTrains() {
    try {
        const trains = await delayedService.fetchDelayedTrains();
        return trains.RESPONSE.RESULT[0].TrainAnnouncement;
    } catch (e) {
        throw new Error(`Failed to get delayed trains: ${e}`);
    }
}

export async function getTickets(context) {
    if (context.user == null) {
        throw new Error('Unauthorized');
    }
    try {
        return await ticketsService.getTickets();
    } catch (e) {
        throw new Error(`Failed to get tickets: ${e}`);
    }
}

export async function getUser(args) {
    try {
        return await usersService.findUserByEmail(args.email);
    } catch (e) {
        throw new Error(`Failed to get user with email ${args.email}: ${e}`);
    }
}

export async function createTicket({ input }, context) {
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
}

export async function deleteTicket({ ticketId }, context) {
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
}

export async function login({ input }) {
    const existingUser = await usersService.findUserByEmail(input.email);
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
}

export async function register({ input }) {
    const existingUser = await usersService.findUserByEmail(input.email);
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
}

export async function updateTicket({ input }, context) {
    if (context.user == null) {
        throw new Error('Unauthorized');
    }
    if (
        ticketLocks.isTicketLocked(input._id) &&
        ticketLocks.getLockingUser(input._id) !== context.token
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
}
