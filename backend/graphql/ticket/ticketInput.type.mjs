import {
    GraphQLInputObjectType,
    GraphQLNonNull, // If certain fields are required
    GraphQLString,
} from 'graphql';

const TicketInputType = new GraphQLInputObjectType({
    name: 'TicketInput',
    description: 'Input for creating a new ticket',
    fields: () => ({
        code: { type: new GraphQLNonNull(GraphQLString) }, // Code is required
        trainnumber: { type: new GraphQLNonNull(GraphQLString) }, // Train number is required
        traindate: { type: GraphQLString }, // Train date is optional
    }),
});

export default TicketInputType;
