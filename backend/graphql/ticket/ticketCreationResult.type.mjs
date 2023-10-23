import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

const TicketCreationResultType = new GraphQLObjectType({
    name: 'TicketCreationResult',
    description: 'Result of creating a new ticket',
    fields: () => ({
        message: { type: new GraphQLNonNull(GraphQLString) },
        ticketId: { type: new GraphQLNonNull(GraphQLString) },
        success: { type: new GraphQLNonNull(GraphQLBoolean) },
    }),
});

export default TicketCreationResultType;
