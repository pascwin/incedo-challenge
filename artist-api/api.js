// Coding Test

// Write a Node.js REST API application that handles the following:
// ● Search for an artist by name based on the following endpoint artist.search,
// return all the results for this artist.
// ● Write the result to a user-supplied CSV filename.
// ● The CSV file should include the following information (name, mbid, url,
// image_small, image)

// ⇒ If no results returned from the artist.search endpoint, retrieve random artist names
// from a JSON dictionary source file for example:

// [‘artistName1’, ‘artistName2’, ‘artistName3’]

// Repeat as necessary until you have gathered a list of artists.

// Though this is a small app, please pay attention to your application structure.
// Host your code on github or bitbucket and include a README with instructions on
// how to install and run your application.
// We wish you lots of fun while coding!
// Your Dev-Team from INCEDO

import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import fetch from "node-fetch"
import dotenv from "dotenv"

const app = express()
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

app.get('/', (req, res) => {
    const AUDIO_SCRABLER_API_KEY = process.env.AUDIO_SCRABLER_API_KEY
    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=${AUDIO_SCRABLER_API_KEY}&format=json`)
        .then(response => response.json())
        .then(data => res.send(data))
})

app.post('/artists', (req, res) => {
    const {search} = req.body;
    console.log(search)
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