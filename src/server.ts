import * as cors from "cors";
import app from "./app";
import Logger from "./utils/winston-logger";
import sequelize from "./models/db.sequelize";
import { Server } from "socket.io";
import { Server as HttpServer } from "http";
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: "*",
};
sequelize.sync();
// sequelize.sync({force:true})
app.use(cors(corsOptions));

app.listen(PORT, () => Logger.info(`App listening on port ${PORT}!`));

const initSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("message", (msg) => {
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });

  return io;
};
