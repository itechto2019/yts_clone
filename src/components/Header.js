import { Link } from 'react-router-dom'
import { MenuAlt1Icon, MenuAlt2Icon, MenuAlt3Icon, MenuAlt4Icon, RefreshIcon, SearchIcon, XIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Header = () => {
    const [menu, setMenu] = useState(false)
    const [searchToggle, setSearchToggle] = useState(false)
    const [result, setResult] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [search, setSearch] = useState('')
    useEffect(() => {
        getSearchResult()
    }, [search])

    const getSearchResult = async () => {
        try {
            const response = await axios.get(`/list_movies.json?query_term=${search}`)
            if (response && !loaded) {
                const { data } = await response.data
                setResult(data.movies)
                setLoaded(true)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const goSearch = (value) => {
        if (value == '')
            setSearchToggle(false)
        if (value != '') {
            setSearch(value)
            setLoaded(false)
            setSearchToggle(true)
        }
    }
    const closeSearchPanel = () => {
        setSearchToggle(!searchToggle)
    }
    return (
        <header className="Header">
            <nav className="nav">
                <div className='app-name'>
                    <Link to="/">
                        <img src="https://yts.mx/assets/images/website/logo-YTS.svg" alt='logo' /> | Clone
                    </Link>
                    <div className='menu'>
                        <MenuAlt3Icon onClick={() => setMenu(!menu)} />
                    </div>
                </div>
                <div className={menu ? 'nav-links open' : 'nav-links collapse'}>
                    <div className='nav-link search'>
                        <SearchIcon />
                        <div className='search-container'>
                            <input type="search" name="q" className='search-movie' placeholder='Search movie' onKeyDown={(e) => e.key === 'Enter' ? goSearch(e.target.value) : ''} />
                            <span className='search-result'>
                                {
                                    searchToggle ?
                                        <div className='result-container'>
                                            {
                                                
                                                    <div className='movie-result'>
                                                        <button className='close-search' onClick={() => closeSearchPanel()}>Close</button>
                                                        {
                                                            result && result.length ?
                                                                result.map((movie, index) => (
                                                                    <div key={index} onClick={() => closeSearchPanel()} className="movie-result-image">
                                                                        <Link to={`movies/movie_id=${movie.id}&movie_title=${movie.slug}`} className="movie-result-panel" >
                                                                            <img src={movie.small_cover_image} onError={(e)=>{e.target.onerror = null; e.target.src="https://yts.mx/images/noposter.svg";e.target.width = "45";e.target.height="67"}} alt={movie.title} />
                                                                            <div>{movie.title} ({movie.year})</div>
                                                                        </Link>
                                                                    </div>
                                                                ))
                                                                : <RefreshIcon className='refresh' id="refresh" />
                                                        }

                                                    </div>
                                                    
                                            }
                                        </div>
                                    : ''
                                }

                            </span>
                        </div>

                    </div>

                    <div className='nav-link'>
                        <Link to="/">HOME</Link>
                    </div>
                    <div className='nav-link'>
                        <Link to="/movies/browse-movies/quality=2160p/genre=all/rating=all/year=all/language=all/order_by=rating/page=1">4K</Link>
                    </div>
                    <div className='nav-link'>
                        <Link to={`/movies/browse-movies/quality=all/genre=all/rating=all/year=all/language=all/order_by=rating/page=1`}>Trending</Link>
                    </div>
                    <div className='nav-link'>
                        <Link to="movies/browse-movies">Browse Movies</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header