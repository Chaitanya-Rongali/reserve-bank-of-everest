import express from "express";
import dotenv from 'dotenv'
import { router } from "./routes/route";
dotenv.config({ path: '.env' })
const app = express();
const port = process.env.PORT
app.use(express.json());
app.use('/api',router)
app.listen(port, () => {
    console.log(`app listening on ${port} `)
})
export default app