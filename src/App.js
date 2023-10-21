import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import UpComing from './components/UpComing'
import MovieItemDetails from './components/MovieItemDetails'
import SearchResults from './components/SearchResults'
import SearchContext from './Context/SearchContext'

// write your code here
class App extends Component {
  state = {searchInput: ''}

  handleSearchInput = value => {
    this.setState({searchInput: value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          handleSearchInput: this.handleSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={UpComing} />
          <Route exact path="/movie/:id" component={MovieItemDetails} />
          <Route exact path="/search" component={SearchResults} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
