import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import http from 'http';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';

import Schema from './graphql/schema.mjs';
import './loadEnvironment.mjs';
import auth from './routes/auth.routes.mjs';
import codes from './routes/codes.routes.mjs';
import delayed from './routes/delayed.routes.mjs';
import tickets from './routes/tickets.routes.mjs';
import fetchTrainPositions from './services/trains.service.mjs';
import ticketLocks from './utils/ticketLocks.mjs';

const app = express();
const httpServer = http.createServer(app);

const graphQlHandler = createHandler({
    schema: Schema,
    context: async (req) => {
        const token = req.headers.authorization;
        if (!token) {
            return {};
        }
        try {
            const decodedJwt = jwt.verify(
                token.replace('Bearer ', ''),
                process.env.JWT_SECRET,
            );
            return { user: decodedJwt, token: token.replace('Bearer ', '') };
        } catch (error) {
            return {};
        }
    },
});

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const io = new Server(httpServer, {
    cors: {
        origin: `*`,
        methods: ['GET', 'POST'],
        optionsSuccessStatus: 200,
    },
});

app.use('/', auth);
app.use('/delayed', delayed);
app.use('/tickets', tickets);
app.use('/codes', codes);

app.use('/graphql', graphQlHandler);

httpServer.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});

ticketLocks.setIo(io);
fetchTrainPositions(io).then((r) => 'ignored');
