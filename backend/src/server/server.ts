import { createServer } from "http";
import bodyParser from 'body-parser'
import { routes } from "./routes";
import express from 'express';
import 'dotenv/config'

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(routes)

const serverHTTP = createServer(app)

export { serverHTTP }