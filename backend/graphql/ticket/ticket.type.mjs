import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const TicketType = new GraphQLObjectType({
    name: 'Ticket',
    description: 'Ticket information',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        trainnumber: { type: new GraphQLNonNull(GraphQLString) },
        traindate: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export default TicketType;
