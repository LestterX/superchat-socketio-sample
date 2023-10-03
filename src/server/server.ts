import bodyParser from 'body-parser';
import { createServer } from "http";
import { routes } from "./routes";
import express from 'express';
import path from "path";
import 'dotenv/config'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', './src/server/views')

app.use(express.static(path.resolve(__dirname, '..', '..', 'public')))
app.use(routes)

const serverHTTP = createServer(app)

export { serverHTTP }