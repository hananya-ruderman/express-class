import express from "express"
import fs from 'fs/promises'
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("baruch")
})

app.get("/briefing", (req, res) => {
    const header = req.headers
    console.log(header)
    if (header["client-unit"] === "golani") {
        console.log(header["client-unit"])
        res.json({ unit: "Golani", message: "briefing delivered" })
    } else {
        res.sendStatus(400)
    }
})

app.post("/targets", async (req, res) => {
    try {
        const target = req.body
        let data = await fs.readFile('./data/targets.json')
        data = JSON.parse(data)
        data.targets.push(target)
        console.log(data)
        fs.writeFile('./data/targets.json', JSON.stringify(data))

        res.send("succede")
    } catch (err) {
        res.status(400).send(err)
    }
})

app.get("/targets/:id", async (req, res) => {
    try {
        let data = await fs.readFile('./data/targets.json')
        data = JSON.parse(data)
        const target = data.targets.find(tar => tar.id === req.params.id)
        res.send(target)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.get("/intel/ping", async (req, res) => {
    const header = req.headers
    const query =JSON.parse(JSON.stringify(req.query)) 
    // try {
    
    let data = await fs.readFile('./data/targets.json')
    data = JSON.parse(data)
    console.log(data)
    console.log(typeof data)
    // if (header["client-unit"] === "golani") {
    //     data.targets.filter(element => {
    //         query.for (const key in object) {
    //             if (!Object.hasOwn(object, key)) continue;
                
    //             const element = object[key];
                
                
    //         }
    //     });
    //         console.log(header["client-unit"])
    //         res.json({ unit: "Golani", message: "briefing delivered" })
    // } else {
    //     res.sendStatus(400)
    // }
})


app.get("/targets/:id/brief", async (req, res) => {
    try {
        let data = await fs.readFile('./data/targets.json')
        data = JSON.parse(data)
        const target = data.targets.find(tar => tar.id === req.params.id)
        res.send({region: target.region, priority: target.priority})
    } catch (err) {
        res.status(400).send(err)
    }
})


app.get("/targets", async (req, res) => {
    const { regien, status, minPriority } = req.query
    try {
        let data = await fs.readFile('./data/targets.json')
        data = JSON.parse(data)
        const targets = data.targets.filter(tar => {
            if (
                tar.regien === regien &&
                tar.status === status &&
                tar.priority >= +minPriority
            )
                return tar
        })
        console.log(targets)
        res.json(targets)
    } catch (err) {
        res.status(400).send(err)
    }
})



app.listen(3000)