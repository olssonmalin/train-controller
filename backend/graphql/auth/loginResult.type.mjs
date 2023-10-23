import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

const LoginResultType = new GraphQLObjectType({
    name: 'LoginResult',
    description: 'Result of a user logging in',
    fields: () => ({
        token: { type: new GraphQLNonNull(GraphQLString) },
        success: { type: new GraphQLNonNull(GraphQLBoolean) },
    }),
});

export default LoginResultType;
