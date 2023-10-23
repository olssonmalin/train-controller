import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const CodeType = new GraphQLObjectType({
    name: 'Code',
    description: 'Code for reason of delay',
    fields: () => ({
        Code: { type: new GraphQLNonNull(GraphQLString) },
        Level1Description: { type: GraphQLString },
        Level2Description: { type: GraphQLString },
        Level3Description: { type: GraphQLString },
    }),
});

export default CodeType;
