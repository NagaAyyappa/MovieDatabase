import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

const MovieItemDetails = props => {
  const [currentApiStatus, SetApiStatus] = useState(apiStatus.initial)
  const [movieDetails, setMovieDetails] = useState({})
  const [castDetails, setCastDetails] = useState([])
  const {match} = props
  const {params} = match
  const {id} = params
  const API_KEY = '4503cbc448adeec9a0740ada2f5a64b7'
  useEffect(() => {
    SetApiStatus(apiStatus.loading)
    const getMovieData = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      const response = await fetch(url)
      const movieData = await response.json()
      const updatedMovieData = {
        id: movieData.id,
        imageURL: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
        budget: movieData.budget,
        title: movieData.original_title,
        overview: movieData.overview,
        rating: movieData.vote_average,
        duration: movieData.runtime,
        releaseDate: movieData.release_date,
        genre: movieData.genres,
      }
      console.log(updatedMovieData)
      setMovieDetails(updatedMovieData)
    }
    const getCastData = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      const response = await fetch(url)
      const castData = await response.json()
      const updatedCastData = castData.cast.map(eachItem => ({
        id: eachItem.id,
        imageURL: `https://image.tmdb.org/t/p/w500${eachItem.profile_path}`,
        originalName: eachItem.original_name,
        characterName: eachItem.character,
      }))
      console.log(updatedCastData)
      setCastDetails(updatedCastData)
      SetApiStatus(apiStatus.success)
    }
    getMovieData()
    getCastData()
  }, [id])

  const renderLoadingView = () => (
    <div className="loader">
      <Loader type="Oval" color="blue" height="30" width="30" />
    </div>
  )

  const renderSuccessView = () => {
    const {
      imageURL,
      budget,
      title,
      overview,
      rating,
      duration,
      releaseDate,
      genre,
    } = movieDetails
    const castMembers =
      castDetails.length <= 10 ? castDetails : castDetails.slice(0, 10)
    return (
      <div className="movie-details-container">
        <h1>Movie Details</h1>
        <div className="movie-details">
          <img src={imageURL} alt={title} className="movie-image" />
          <div>
            <h1 className="movie-title">{title}</h1>
            <p>{overview}</p>
            <p>
              <span className="para">Budget: </span>
              {budget}
            </p>
            <p>
              <span className="para">Duration: </span>
              {duration} min
            </p>
            <p>
              <span className="para">Release Date: </span>
              {releaseDate}
            </p>
            <params>
              <span className="para">Rating: </span>
              {rating}
            </params>
            <div className="genre-container">
              <p className="para">Genre:</p>
              <ul className="genre-list">
                {genre.map(eachItem => (
                  <li className="genre-item">{eachItem.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <h1>Cast Details</h1>
        <ul className="cast-list">
          {castMembers.map(eachItem => (
            <li className="cast-item">
              <img
                src={eachItem.imageURL}
                alt={eachItem.originalName}
                className="cast-image"
              />
              <p className="para2">{eachItem.originalName}</p>
              <p className="character">As {eachItem.characterName}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="popular-container">
      <Header />
      {currentApiStatus === apiStatus.loading && renderLoadingView()}
      {currentApiStatus === apiStatus.success && renderSuccessView()}
    </div>
  )
}

export default MovieItemDetails
