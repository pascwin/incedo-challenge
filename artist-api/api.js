import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import fetch from "node-fetch"
import dotenv from "dotenv"

const app = express()
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

app.post('/artists', (req, res) => {
    const {search} = req.body;
    if (search) {
        const AUDIO_SCRABLER_API_KEY = process.env.AUDIO_SCRABLER_API_KEY
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${AUDIO_SCRABLER_API_KEY}&format=json`)
        .then(response => response.json())
        .then(data => res.send(data))
    } else {
        res.send([])
    }
})

app.listen(3000, () => {
    console.log("app is running on port 3000");
})