import { MongoClient, ServerApiVersion } from 'mongodb';

import '../loadEnvironment.mjs';

class MongoDBSingleton {
    constructor() {
        if (MongoDBSingleton.instance) {
            return MongoDBSingleton.instance;
        }

        const uri = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@traincontroller.zkv3txq.mongodb.net/?retryWrites=true&w=majority`;

        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });

        this.db = null;

        MongoDBSingleton.instance = this;
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db('train_controller');
            return this.db;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

const mongoDBSingleton = new MongoDBSingleton();

export default mongoDBSingleton;
