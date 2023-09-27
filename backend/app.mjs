import "./loadEnvoironment.mjs";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetchTrainPositions from "./models/trains.mjs";
import delayed from "./routes/delayed.mjs";
import tickets from './routes/tickets.mjs'
import codes from "./routes/codes.mjs";
import http from "http";
import { Server } from "socket.io";

const app = express()
const httpServer = http.createServer(app);

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const io = new Server(httpServer, {
  cors: {
    origin: `*`,
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200
  }
});

app.get('/', (req, res) => {
  res.json({
      data: 'Hello World!'
  })
})

app.use("/delayed", delayed);
app.use("/tickets", tickets);
app.use("/codes", codes);

httpServer.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

fetchTrainPositions(io);
