import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {details} = props
  const {title, voteAverage, imageURL, id} = details
  return (
    <li className="movie-list-item">
      <img src={imageURL} alt={title} className="image" />
      <div className="rating-container">
        <h1 className="title">{title}</h1>
        <p className="vote">{voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="link-item">
        <button type="button" className="view-details-button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieItem
