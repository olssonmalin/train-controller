import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const TicketUpdateInputType = new GraphQLInputObjectType({
    name: 'TicketUpdateInput',
    description: 'Input for updating a ticket',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) }, // id is required
        code: { type: GraphQLString },
        trainnumber: { type: GraphQLString },
        traindate: { type: GraphQLString },
    }),
});

export default TicketUpdateInputType;
