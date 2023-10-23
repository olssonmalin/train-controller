import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

const DelayedTrainType = new GraphQLObjectType({
    name: 'DelayedTrain',
    description: 'Delayed train information',
    fields: () => ({
        ActivityId: { type: new GraphQLNonNull(GraphQLString) },
        ActivityType: { type: new GraphQLNonNull(GraphQLString) },
        AdvertisedTimeAtLocation: { type: new GraphQLNonNull(GraphQLString) },
        AdvertisedTrainIdent: { type: GraphQLString },
        Canceled: { type: new GraphQLNonNull(GraphQLBoolean) },
        EstimatedTimeAtLocation: { type: new GraphQLNonNull(GraphQLString) },
        FromLocation: { type: new GraphQLList(LocationType) },
        ToLocation: { type: new GraphQLList(LocationType) },
        TrainOwner: { type: GraphQLString },
        LocationSignature: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const LocationType = new GraphQLObjectType({
    name: 'Location',
    description: 'Train location information',
    fields: () => ({
        LocationName: { type: GraphQLString },
        Priority: { type: GraphQLInt },
        Order: { type: GraphQLInt },
    }),
});

export default DelayedTrainType;
