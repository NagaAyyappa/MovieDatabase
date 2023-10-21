import {Link} from 'react-router-dom'
import './index.css'
import SearchContext from '../../Context/SearchContext'

const Header = () => (
  <SearchContext.Consumer>
    {value => {
      const {searchInput, handleSearchInput} = value

      const onSearchInputChange = event => {
        handleSearchInput(event.target.value)
      }

      return (
        <nav className="nav-container">
          <Link to="/" className="link-item">
            <h1 className="nav-title">movieDB</h1>
          </Link>
          <ul className="un-list">
            <Link to="/" className="link-item">
              <li className="list-item">
                <button type="button" className="list-button">
                  Popular
                </button>
              </li>
            </Link>
            <Link to="/top-rated" className="link-item">
              <li className="list-item">
                <button type="button" className="list-button">
                  Top Rated
                </button>
              </li>
            </Link>
            <Link to="/upcoming" className="link-item">
              <li className="list-item">
                <button type="button" className="list-button">
                  Upcoming
                </button>
              </li>
            </Link>
          </ul>
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              className="search-text"
              placeholder="Search for movies"
              onChange={onSearchInputChange}
            />
            <Link to={`/search?query=${searchInput}`} className="link-item">
              <button type="button" className="search-button">
                Search
              </button>
            </Link>
          </div>
        </nav>
      )
    }}
  </SearchContext.Consumer>
)

export default Header
