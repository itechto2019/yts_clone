import { useState } from "react"
import { useEffect } from "react"
import axiosFetch from 'axios'
import { RefreshIcon, StarIcon } from "@heroicons/react/solid"
import { Link, useParams } from 'react-router-dom'

const MoviesResult = () => {
    const { p_page } = useParams()
    const { p_quality } = useParams()
    const { p_genre } = useParams()
    const { p_rating } = useParams()
    const { p_year } = useParams()
    const { p_language } = useParams()
    const { p_order } = useParams()

    const [moviesList, setMoviesList] = useState([])
    const [message, setMessage] = useState("")
    const [limit, setLimit] = useState(20)
    const [loaded, setLoaded] = useState(null)
    const [page, setPage] = useState(p_page)
    const [quality, setQuality] = useState(p_quality)
    const [genre, setGenre] = useState(p_genre)
    const [rating, setRating] = useState(p_rating)
    const [year, setYear] = useState(p_year)
    const [language, setLanguage] = useState(p_language)
    const [order, setOrder] = useState(p_order)


    useEffect(() => {
        getMoviesList()
    }, [p_quality, p_genre, p_rating, p_year, p_language, p_order, page, p_page, loaded])
    const getMoviesList = async () => {
        try {
            const response = await axiosFetch.get(`https://yts.mx/api/v2/list_movies.json?limit=20&quality=${p_quality}&genre=${p_genre}&minimum_rating=${p_rating}&query_term=${p_year}&sort_by=${p_order}&query_term=${p_language}&page=${p_page}`)
            if (response && !loaded) {
                const { data } = await response.data
                setPage(data.page_number)
                setTimeout(() => {
                    setMoviesList(data.movies)
                }, 3000);
                setLoaded(false)
            }
            if (!response) {
                setMessage("No result found!")
            }
        } catch (e) {
            console.log(e)
        }
    }
    const nextPage = () => {
        if (page !== 0 && page !== 15) {
            setPage(page + 1)
            setMoviesList([])
            setLoaded(false)
            window.scrollTo(0, 0)
        }
        if (page == 0) {
            setPage(page)
            window.scrollTo(0, 0)
            setMoviesList([])
            setLoaded(false)

        }

    }
    const prevPage = () => {
        if (page !== 0 && page !== 15) {
            setPage(page - 1)
            window.scrollTo(0, 0)
            setMoviesList([])
            setLoaded(false)
        }
        if (page == 0) {
            setPage(page)
            window.scrollTo(0, 0)
            setMoviesList([])
            setLoaded(false)

        }
    }
    const getSearch = () => {
        setMoviesList([])
        setLoaded(false)
        setQuality(quality)
        setGenre(genre)
        setRating(rating)
        setYear(year)
        setOrder(order)
        getMoviesList()
    }
    return (
        <div className="myMovies">
            <div className="movies-queries">
                <div className="input-field">
                    <div className="input-group">
                        <select name="quality" defaultValue={p_quality} onChange={(e) => setQuality(e.target.value)}>
                            <option value="all">All</option>
                            <option value="480p">480p</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="2160p">2160p</option>
                            <option value="3D">3D</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <select name="genre" defaultValue={p_genre} onChange={(e) => setGenre(e.target.value)}>
                            <option value="all">All</option>
                            <option value="action">Action</option>
                            <option value="adventure">Adventure</option>
                            <option value="animation">Animation</option>
                            <option value="biography">Biography</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="documentary">Documentary</option>
                            <option value="drama">Drama</option>
                            <option value="family">Family</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="film-noir">Film-Noir</option>
                            <option value="game-show">Game-Show</option>
                            <option value="history">History</option>
                            <option value="horror">Horror</option>
                            <option value="music">Music</option>
                            <option value="musical">Musical</option>
                            <option value="mystery">Mystery</option>
                            <option value="news">News</option>
                            <option value="reality-tv">Reality-TV</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-Fi</option>
                            <option value="sport">Sport</option>
                            <option value="talk-show">Talk-Show</option>
                            <option value="thriller">Thriller</option>
                            <option value="war">War</option>
                            <option value="western">Western</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <select name="rating" defaultValue={p_rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="0">All</option>
                            <option value="9">9+</option>
                            <option value="8">8+</option>
                            <option value="7">7+</option>
                            <option value="6">6+</option>
                            <option value="5">5+</option>
                            <option value="4">4+</option>
                            <option value="3">3+</option>
                            <option value="2">2+</option>
                            <option value="1">1+</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <select name="year" defaultValue={p_year} onChange={(e) => setYear(e.target.value)}>
                            <option value="0">All</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2015-2018">2015-2018</option>
                            <option value="2010-2014">2010-2014</option>
                            <option value="2000-2009">2000-2009</option>
                            <option value="1990-1999">1990-1999</option>
                            <option value="1980-1989">1980-1989</option>
                            <option value="1970-1979">1970-1979</option>
                            <option value="1950-1969">1950-1969</option>
                            <option value="1900-1949">1900-1949</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <select name="language" defaultValue={p_language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="en">English</option>
                            <option value="foreign">Foreign</option>
                            <option value="all">All</option>
                            <option value="fr">French</option>
                            <option value="ja">Japanese</option>
                            <option value="it">Italian</option>
                            <option value="es">Spanish</option>
                            <option value="de">German</option>
                            <option value="zh">Chinese</option>
                            <option value="ko">Korean</option>
                            <option value="cn">Cantonese</option>
                            <option value="hi">Hindi</option>
                            <option value="ru">Russian</option>
                            <option value="sv">Swedish</option>
                            <option value="pt">Portuguese</option>
                            <option value="pl">Polish</option>
                            <option value="th">Thai</option>
                            <option value="da">Danish</option>
                            <option value="nl">Dutch</option>
                            <option value="no">Norwegian</option>
                            <option value="ta">Tamil</option>
                            <option value="vi">Vietnamese</option>
                            <option value="fi">Finnish</option>
                            <option value="te">Telugu</option>
                            <option value="cs">Czech</option>
                            <option value="tr">Turkish</option>
                            <option value="ar">Arabic</option>
                            <option value="id">Indonesian</option>
                            <option value="fa">Persian</option>
                            <option value="hu">Hungarian</option>
                            <option value="el">Greek</option>
                            <option value="tl">Tagalog</option>
                            <option value="he">Hebrew</option>
                            <option value="uk">Ukrainian</option>
                            <option value="et">Estonian</option>
                            <option value="ro">Romanian</option>
                            <option value="bn">Bangla</option>
                            <option value="ur">Urdu</option>
                            <option value="ml">Malayalam</option>
                            <option value="ms">Malay</option>
                            <option value="is">Icelandic</option>
                            <option value="ca">Catalan</option>
                            <option value="sk">Slovak</option>
                            <option value="sr">Serbian</option>
                            <option value="xx">xx</option>
                            <option value="pa">Punjabi</option>
                            <option value="ka">Georgian</option>
                            <option value="wo">Wolof</option>
                            <option value="kn">Kannada</option>
                            <option value="af">Afrikaans</option>
                            <option value="eu">Basque</option>
                            <option value="mr">Marathi</option>
                            <option value="lv">Latvian</option>
                            <option value="bo">Tibetan</option>
                            <option value="am">Amharic</option>
                            <option value="lt">Lithuanian</option>
                            <option value="mk">Macedonian</option>
                            <option value="sh">Serbo-Croatian</option>
                            <option value="gl">Galician</option>
                            <option value="ps">Pashto</option>
                            <option value="hy">Armenian</option>
                            <option value="st">Southern Sotho</option>
                            <option value="sw">Swahili</option>
                            <option value="bs">Bosnian</option>
                            <option value="ak">Akan</option>
                            <option value="cmn">cmn</option>
                            <option value="mn">Mongolian</option>
                            <option value="zxx">No linguistic content</option>
                            <option value="la">Latin</option>
                            <option value="fil">Filipino</option>
                            <option value="gu">Gujarati</option>
                            <option value="xh">Xhosa</option>
                            <option value="zu">Zulu</option>
                            <option value="ig">Igbo</option>
                            <option value="ku">Kurdish</option>
                            <option value="cy">Welsh</option>
                            <option value="mt">Maltese</option>
                            <option value="sq">Albanian</option>
                            <option value="kk">Kazakh (1)</option>
                            <option value="yue">Cantonese</option>
                            <option value="sl">Slovenian</option>
                            <option value="yo">Yoruba</option>
                            <option value="az">Azerbaijani</option>
                            <option value="hr">Croatian</option>
                            <option value="be">Belarusian</option>
                            <option value="lg">Ganda</option>
                            <option value="iu">Inuktitut</option>
                            <option value="so">Somali</option>
                            <option value="ab">Abkhazian</option>
                            <option value="ht">Haitian Creole</option>
                            <option value="ky">Kyrgyz</option>
                            <option value="lb">Luxembourgish</option>
                            <option value="ga">Irish</option>
                            <option value="km">Khmer</option>
                            <option value="mi">Maori</option>
                            <option value="aa">Afar</option>
                            <option value="yi">Yiddish</option>
                            <option value="nb">Norwegian Bokmål </option>
                            <option value="os">Ossetic</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <select name="order_by" defaultValue={p_order} onChange={(e) => setOrder(e.target.value)}>
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                            <option value="featured">Featured</option>
                            <option value="seeds">Seeds</option>
                            <option value="peers">Peers</option>
                            <option value="year">Year</option>
                            <option value="rating">IMDb Rating</option>
                            <option value="likes">YTS Likes</option>
                            <option value="rt_audience">RT Audience</option>
                            <option value="alphabetical">Alphabetical</option>
                            <option value="downloads">Downloads</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <div className="pagination search">
                            <Link role="button"
                                to={`/movies/browse-movies/quality=${quality}/genre=${genre}/rating=${rating}/year=${year}/language=${language}/order_by=${order}/page=${page}`} onClick={() => getSearch()}>Search</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="loading">
                {
                    !moviesList ?
                        <h1>No movies found!</h1>
                        : ''
                }
                {
                    !loaded && moviesList?.length == 0 ?
                        <RefreshIcon className="refresh" />
                        : ''
                }
                {
                    !loaded && moviesList?.length == 0 ?
                        <h3>Searching</h3>
                        : !loaded && moviesList?.length == 0 ?
                            <Link to={'/'}><h3>Return Home</h3></Link>
                            : ''
                }
                {
                    page >= 1 && moviesList?.length > 0 ?
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div className="pagination" style={{
                                padding: '10px'
                            }}>
                                <Link role="button" to={`/movies/browse-movies/quality=${quality}/genre=${genre}/rating=${rating}/year=${year}/language=${language}/order_by=${order}/page=${page - 1}`} onClick={prevPage}>Previous page</Link>
                            </div>
                            <div className="pagination">
                                <Link role="button" to={`/movies/browse-movies/quality=${quality}/genre=${genre}/rating=${rating}/year=${year}/language=${language}/order_by=${order}/page=${page + 1}`} onClick={nextPage}>Next page</Link>
                            </div>
                        </div>
                        : page == 15 && moviesList?.length > 0 ?
                            <div>
                                <div className="pagination">
                                    <Link role="button" to={`/movies/browse-movies/quality=${quality}/genre=${genre}/rating=${rating}/year=${year}/language=${language}/order_by=${order}/page=${page + 1}`} onClick={nextPage}>Next page</Link>
                                </div>
                            </div>
                            : ''

                }

            </div>
            <div className="MoviesList">
                {
                    moviesList && moviesList.length ?
                        moviesList.map((movie, index) => (
                            <figcaption className="movie" key={index}>
                                <div className="movie-thumb">
                                    <Link to={`/movies/movie_id=${movie.id}&movie_title=${movie.slug}`}>
                                        <span id="movie-thumb">
                                            <div className="movie-thumb-info">
                                                <div className="span-content">
                                                    <StarIcon />
                                                    <div className="movie-thumb-rating">{movie.rating} / 10</div>
                                                    <div>
                                                        {
                                                            movie.torrents.map((torrent, index) => (
                                                                <h2>{torrent.quality}</h2>
                                                            ))
                                                        }
                                                    </div>
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
                    page == 15 ?
                        <Link role="button" to="/" >Return to home</Link>
                        : ''
                }
            </div>
        </div>
    )
}
export default MoviesResult