import express from "express"
import targets from './routes/targets.js'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT


const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("baruch")
})

app.use((req, res, next) => {
    console.log(`method: ${req.method}, to the url: ${req.originalUrl}, on ${Date()} `)
    next()
})

app.use((req, res, next) => {
    res.setHeader("X-Server-Start-Time", Date())
    next()
})

app.use('/targets', targets)



app.listen(PORT)