import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

const TicketUpdateResultType = new GraphQLObjectType({
    name: 'TicketUpdateResult',
    description: 'Result of updating or deleting a ticket',
    fields: () => ({
        message: { type: new GraphQLNonNull(GraphQLString) },
        success: { type: new GraphQLNonNull(GraphQLBoolean) },
    }),
});

export default TicketUpdateResultType;
