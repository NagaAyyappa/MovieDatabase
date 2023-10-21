import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import MovieItem from '../MovieItem'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class SearchResults extends Component {
  state = {moviesData: [], currentApiStatus: apiStatus.initial, pageNo: 1}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {pageNo} = this.state
    const {location} = this.props
    const {search} = location
    const searchInput = search.slice(7, search.length)
    this.setState({currentApiStatus: apiStatus.loading})
    const API_KEY = '4503cbc448adeec9a0740ada2f5a64b7'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.results.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      voteAverage: eachMovie.vote_average,
      imageURL: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
    }))
    this.setState({
      moviesData: updatedData,
      currentApiStatus: apiStatus.success,
    })
  }

  handleNextPage = () => {
    this.setState(prevState => ({pageNo: prevState.pageNo + 1}), this.getData)
  }

  handlePreviousPage = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(prevState => ({pageNo: prevState.pageNo - 1}), this.getData)
    }
    this.setState({pageNo: 1}, this.getData)
  }

  renderLoadingView = () => (
    <div className="loader">
      <Loader type="Oval" color="blue" height="30" width="30" />
    </div>
  )

  renderSuccessView = () => {
    const {moviesData} = this.state
    return (
      <ul className="movies-list">
        {moviesData.map(eachItem => (
          <MovieItem details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {currentApiStatus} = this.state
    return (
      <div className="popular-container">
        <Header />
        {currentApiStatus === apiStatus.loading && this.renderLoadingView()}
        {currentApiStatus === apiStatus.success && this.renderSuccessView()}
        <div className="button-container">
          <button
            type="button"
            className="page-button"
            onClick={this.handlePreviousPage}
          >
            Previous Page
          </button>
          <button
            type="button"
            className="page-button"
            onClick={this.handleNextPage}
          >
            Next Page
          </button>
        </div>
      </div>
    )
  }
}

export default SearchResults
