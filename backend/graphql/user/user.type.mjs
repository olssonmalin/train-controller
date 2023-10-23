import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User data',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export default UserType;
