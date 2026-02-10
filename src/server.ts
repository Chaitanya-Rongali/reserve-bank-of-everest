import express from "express";
import dotenv from 'dotenv'
import { customerRouter } from "./routes/customerroute";
import { accountRouter } from "./routes/accountroute";
import { transactionRouter } from "./routes/transcationroute";
dotenv.config({ path: '.env' })
const app = express();
const port = process.env.PORT
app.use(express.json());
app.use('/api',customerRouter)
app.use('/api',accountRouter)
app.use('/api',transactionRouter)
app.listen(port, () => {
    console.log(`app listening on ${port} `)
})
export default app