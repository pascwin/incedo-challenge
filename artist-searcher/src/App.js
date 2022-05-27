import {useEffect, useState} from "react"

import { ArtistTable } from "./components/ArtistTable";
import { Dashboard } from "./components/Dashboard";
import { SearchBox } from "./components/SearchBox";
import './App.css';


function App() {
const [artists, setArtists] = useState([])
const [searchfield, setSearchfield] = useState("")

// useEffect(() => {
//   fetch("http://localhost:3000/", {
//     method: "get",
//   })
//   .then(response => response.json())
//   .then(data => setArtists(data.results.artistmatches.artist))
// }, [artists])

useEffect(() => {
  if(searchfield) {
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
    })
    .catch((err) => {
      console.error(err)
    })
  }
}, [searchfield])


const searchForArtists = (event) => {
  const searchValue = document.getElementById("searchfield").value
  setSearchfield(searchValue)
}



  return (
    <div className="App">
      <Dashboard />
      <SearchBox searchForArtists={searchForArtists}/>
      <ArtistTable artists={artists} />
    </div>
  );
}

export default App;
