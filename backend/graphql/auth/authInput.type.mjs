import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

const AuthInputType = new GraphQLInputObjectType({
    name: 'AuthInput',
    description: 'Input for login/registering',
    fields: () => ({
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export default AuthInputType;
