import express, {Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import './db/mongoose'
import router from './routers/shortener'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});