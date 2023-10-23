import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

const RegisterResultType = new GraphQLObjectType({
    name: 'RegisterResult',
    description: 'Result of registering a new user',
    fields: () => ({
        success: { type: new GraphQLNonNull(GraphQLBoolean) },
    }),
});

export default RegisterResultType;
