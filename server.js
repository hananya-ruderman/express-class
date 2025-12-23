import express from "express"
import route from './routes/targets.js'

const app = express()
app.use(express.json())
app.get("/", (req, res) => {
    res.send("baruch")
})


app.use('/targets', route)



app.listen(3000)