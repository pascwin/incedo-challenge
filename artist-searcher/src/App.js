import { useEffect, useState } from "react"
import { CSVLink } from 'react-csv';

import { ArtistTable } from "./components/ArtistTable";
import { Dashboard } from "./components/Dashboard";
import { SearchBox } from "./components/SearchBox";
import { Scroll } from "./components/Scroll"

import './App.css'

const alternativeData = [
  { name: 'Cher', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818', url: 'https://www.last.fm/music/Cher', image_small: 'XXX' },
  { name: 'Elvis Presley', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818', url: 'https://www.last.fm/music/Cher', image_small: 'XXX' },
  { name: 'Johnny Cash', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818', url: 'https://www.last.fm/music/Cher', image_small: 'XXX' },
  { name: 'Eminem', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818', url: 'https://www.last.fm/music/Cher', image_small: 'XXX' },
  { name: 'Miley Cyrus', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818', url: 'https://www.last.fm/music/Cher', image_small: 'XXX' },
  { name: 'Madonna', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818', url: 'https://www.last.fm/music/Cher', image_small: 'XXX' },
  { name: 'Mozart', mbid: 'bfcc6d75-a6a5-4bc6-8282-47aec8531818', url: 'https://www.last.fm/music/Cher', image_small: 'XXX' },
]


function App() {
  const [artists, setArtists] = useState([])
  const [searchfield, setSearchfield] = useState("")
  const [exportData, setExportData] = useState([])

  useEffect(() => {
    if (searchfield) {
      fetch("http://localhost:3000/artists", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          search: searchfield
        })
      })
        .then(res => res.json())
        .then(data => {
          setArtists(data.results.artistmatches.artist)
          console.log(artists)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [searchfield])

  useEffect(() => {
    const data = artists.map((artist) => {
      const obj = {}
      obj["name"] = artist.name;
      obj["mbid"] = artist.mbid;
      obj["url"] = artist.url;
      obj["image_small"] = artist.image[0]["#text"];
      return obj;
    })
    setExportData(data)
  }, [artists])


  const searchForArtists = (event) => {
    const searchValue = document.getElementById("searchfield").value
    setSearchfield(searchValue)
  }

  const csvReport = {
    data: exportData,
    filename: 'artists.csv'
  };

  const alternativeReport = {
    data: alternativeData,
    filename: "artists.csv"
  }

  return (
    <div className="App">
      <Dashboard />
      <SearchBox searchForArtists={searchForArtists} />
      <div className="export-link">
        {
          exportData[0]
            ?
            <CSVLink {...csvReport} separator=";" >Export this table to CSV</CSVLink>
            :
            <CSVLink {...alternativeReport} separator=";" >No export data - generate a random list of artists</CSVLink>
        }
      </div>
      <Scroll>
        <ArtistTable artists={artists} />
      </Scroll>
    </div>
  );
}

export default App;
