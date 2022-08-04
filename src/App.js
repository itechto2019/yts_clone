import './stylesheets/app.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import Movie from './MoviesFetch/Movie'
import MoviesListPage from './MoviesFetch/MoviesListPage'
import BrowseMovies from './MoviesFetch/BrowseMovies'
import MoviesResult from './MoviesFetch/MoviesResult'
const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/movies/movie_id=:id' element={<Movie />}></Route>
        <Route path='/movies/page=:pageNum' element={<MoviesListPage />}></Route>
        <Route path='/movies/browse-movies' element={<BrowseMovies />}></Route>
        <Route path='/movies/browse-movies/quality=:p_quality/genre=:p_genre/rating=:p_rating/year=:p_year/language=:p_language/order_by=:p_order/page=:p_page' element={<MoviesResult />}></Route>

      </Routes>
      <center><small>Christian Rapsing</small></center>
    </div>
  )
}
export default App