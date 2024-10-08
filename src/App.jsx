import { useEffect, useRef, useState } from "react"
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard"

const API_URL = 'https://www.omdbapi.com/?apikey=a0427c75'

// const movie1 = {
//   "Title": "Batman v Superman: Dawn of Justice",
//   "Year": "2016",
//   "imdbID": "tt2975590",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
// }

const App = () => {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const inpVal = useRef()

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }
  console.log(inpVal.current)

  useEffect(() => {
    searchMovies('Batman')
  }, [])

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            placeholder="Search for movies" ref={inpVal} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={SearchIcon} alt="search" onClick={() => {
            inpVal.current.value == '' ? '' : searchMovies(searchTerm)
          }
          } />
        </div>

        {movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}


      </div>
    </>
  )
}

export default App
