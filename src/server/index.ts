import "./config";
import express from "express";
import morgan from "morgan";
import serveStatic from "./middleware/serveStatic";
import router from "./routes";
import { log } from "./log";
import cookieParser from "cookie-parser";
import { session } from "./middleware/session";
import { keepAlive } from "./utils/keepAlive";

const port = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(serveStatic);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session);
app.use(router);

// Start the server
app.listen(port, function listen() {
  log.info(`server started at http://localhost:${port}`);
  keepAlive();
});
