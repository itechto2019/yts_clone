import { useState } from "react"
import { useEffect } from "react"
import axiosFetch from 'axios'
import { RefreshIcon, StarIcon } from "@heroicons/react/solid"
import { Link, useParams } from 'react-router-dom'

const MoviesListPage = () => {
    const {pageNum} = useParams()
    const [moviesList, setMoviesList] = useState([])
    const [message, setMessage] = useState("")
    const [limit, setLimit] = useState(20)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        getMoviesList()
    }, [])
    const getMoviesList = async () => {
        try {
            const response = await axiosFetch.get(`/list_movies.json?limit=50&page=${parseInt(pageNum)}`)
            if (response && !loaded) {
                const { data } = await response.data
                setMoviesList(data.movies)
                setLoaded(false)
            }
            if (!response) {
                setMessage("No result found!")
            }
        } catch (e) {
            console.log(e)
        }
    }

    window.onscroll = () => {
        if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
            if (limit != 50 && !loaded){
                setTimeout(() => {
                    setLimit(limit + 10)
                    getMoviesList() 
                }, 3000);
            }if(limit == 50) {
                setLoaded(true)
            }
        }
    }
    const nextPage = () => {
        window.scrollTo(0, 0)
        setLimit(20)
        setMoviesList([])
        setLoaded(false)
        getMoviesList()
    }
    return (
        <div className="myMovies">
            <div className="MoviesList">
                {
                    moviesList && moviesList.length ?
                        moviesList.slice(0, limit).map((movie, index) => (
                            <figcaption className="movie" key={index}>
                                <div className="movie-thumb">
                                    <Link to={`/movies/movie_id=${movie.id}&movie_title=${movie.slug}`}>
                                        <span id="movie-thumb">
                                            <div className="movie-thumb-info">
                                                <div className="span-content">
                                                    <StarIcon />
                                                    <div className="movie-thumb-rating">{movie.rating} / 10</div>
                                                </div>
                                            </div>
                                        </span>
                                        <img src={movie.medium_cover_image} alt="failed to load" />
                                        <div className="movie-short-title">
                                            <b>{movie.title_english.length > 20 ? movie.title_english.slice(0, 25) + "..." : movie.title_english}</b>
                                            <div>
                                                <small>{movie.year}</small>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </figcaption>
                        ))
                        : message
                }
            </div>
            <div className="loading">
                {
                    loaded == false && limit != 50 ?
                        <RefreshIcon className="refresh" />
                        : ''
                }
                {
                    loaded && limit == 50 ? 
                        <div className="pagination">
                            <Link role="button" to={`/movies/page=${parseInt(pageNum) + 1}`} onClick={nextPage}>Next page</Link>
                        </div>
                    :''
                }
            </div>

        </div>
    )
}
export default MoviesListPage