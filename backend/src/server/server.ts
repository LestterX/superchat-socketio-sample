import { createServer } from "http";
import { routes } from "./routes";
import express from 'express';
import 'dotenv/config'

const app = express();
app.use(routes)
const serverHTTP = createServer(app)

export { serverHTTP }