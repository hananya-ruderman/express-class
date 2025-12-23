
import fs from 'fs/promises'

export const getWithHeaders = (req, res, next) => {
    const header = req.headers
    if (header["client-unit"]){
        if (header["client-unit"] === "golani") {
            next()
        }
    } else {
        res.sendStatus(400)
    }
}


export const getTargetsWithParams = async (req, res, next) => {
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
            console.log(tar)
                return tar
                
        })
        next()
    
    } catch (err) {
        res.status(400).send(err)
    }
}


export const getTargets = async (req, res) => {
    try {
        let data = await fs.readFile('./data/targets.json')
        data = JSON.parse(data)
        res.send(data)
    } catch (err) {
        res.status(400).send(err)

    }
}

export const postTargets =  async (req, res) => {
    try {
        const target = req.body
        let data = await fs.readFile('./data/targets.json')
        data = JSON.parse(data)
        data.targets.push(target)
        fs.writeFile('./data/targets.json', JSON.stringify(data))

        res.send("succede")
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getTarget = async (req, res) => {
    try {
        let data = await fs.readFile('./data/targets.json')
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
        let data = await fs.readFile('./data/targets.json')
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
        let data = await fs.readFile('./data/targets.json')
        data = JSON.parse(data)
        const target = data.targets.find(tar => tar.id === req.params.id)
        res.send({ region: target.region, priority: target.priority })
    } catch (err) {
        res.status(400).send(err)
    }
}

export const searchTarget = async (req, res) => {
    const {search} = req.params
    const searchData = new RegExp(search, "i")
    try {
        let data = await fs.readFile('./data/targets.json')
        const dataParsed = JSON.parse(data)
        const result = dataParsed.targets.filter(target => {
            if ( searchData.test(JSON.stringify(target))) return target
           })
        res.json(result)

    } catch (err) {
        res.status(400).send(err)

    }
}


