
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const __dirname = path.resolve()
const targetsPath = process.env.targetsPath || path.join(__dirname, "data", "targets.json")
console.log(targetsPath)


export const getWithHeaders = (req, res, next) => {
    const header = req.headers
    if (header["client-unit"]) {
        if (header["client-unit"] === "golani") {
            next()
        }
        else res.status(400).json({})
    } else {
        res.status(400).json({})
    }
}


export const getTargetsWithParams = async (req, res, next) => {
    const { regien, status, minPriority } = req.query
    try {
        let data = await fs.readFile(targetsPath)
        data = JSON.parse(data)
        const targets = data.targets.filter(tar => {
            if (
                tar.regien === regien &&
                tar.status === status &&
                tar.priority >= +minPriority
            )
                
            return 

        })
        next()

    } catch (err) {
        res.status(400).send(err)
    }
}


export const getTargets = async (req, res) => {
    try {
        let data = await fs.readFile(targetsPath)
        data = JSON.parse(data)
        console.log(data)
        res.json(data)
    } catch (err) {
        
        res.status(400).send(err)

    }
}

export const postTargets = async (req, res) => {
    if (req.headers["content-type"] === "application/json"){
        try {
            const target = req.body
            let data = await fs.readFile(targetsPath)
            data = JSON.parse(data)
            data.targets.push(target)
            fs.writeFile(targetsPath, JSON.stringify(data))

            res.send("succede")
        } catch (err) {
            res.status(400).send(err)
        }
    } else res.status(400).send("invalid content-type, accepts only json")
}
export const getTarget = async (req, res) => {
    try {
        let data = await fs.readFile(targetsPath)
        data = JSON.parse(data)
        const target = data.targets.find(tar => tar.id === req.params.id)
        res.send(target)
    } catch (err) {
        res.status(400).send(err)
    }
}



export const getWithHeadersAndParams = async (req, res) => {
    const header = req.headers
    const query = JSON.parse(JSON.stringify(req.query))
    try {
        let data = await fs.readFile(targetsPath)
        data = JSON.parse(data)
        if (header["client-unit"] === "golani") {
            const targets = data.targets.filter(target => {
                for (const key in query) {
                    if (target[key] === query[key]) {
                        return target
                    }
                }
            })
            res.json(targets)
        } else {
            res.sendStatus(400)
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

export const getSpesificDetailsById = async (req, res) => {
    try {
        let data = await fs.readFile(targetsPath)
        data = JSON.parse(data)
        const target = data.targets.find(tar => tar.id === req.params.id)
        res.send({ region: target.region, priority: target.priority })
    } catch (err) {
        res.status(400).send(err)
    }
}

export const searchTarget = async (req, res) => {
    const { search } = req.params
    const searchInsensitive = `${search}`.toUpperCase()
    try {
        const data = await fs.readFile(targetsPath)

        const parsedData = JSON.parse(data)
        console.log(parsedData)

        const result = parsedData.targets.filter(target => {

            const keys = Object.keys(target)
            for (const key of keys) {
                if (key.toUpperCase().includes(searchInsensitive) || `${target[key]}`.toUpperCase().includes(searchInsensitive)) return true;
            }
            return false
        })
        console.log(result)

        res.json(result)

    } catch (err) {
        res.status(400).send(err)

    }
}


