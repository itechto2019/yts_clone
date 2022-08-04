import { DownloadIcon, StarIcon } from "@heroicons/react/solid"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
const Movie = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState([])
    const [screenshot, setScreenshot] = useState('')
    const [readFull, setReadFull] = useState(false)
    const [img, setImg] = useState('')
    window.onload = (e) => {
        window.scrollTo(0, 0)
    }
    useEffect(() => {
        getMovie()
    }, [id, img])
    const getMovie = async () => {
        try {
            const response = await axios.get(`/movie_details.json?movie_id=${id}&with_cast=true&with_images=true`)
            if (response) {
                const { data } = await response.data
                setMovie(data.movie)
            }
        } catch (e) {

        }
    }
    const getDate = () => {
        return new Date(movie.date_uploaded).toLocaleDateString()
    }
    return (
        <div className="Movie-show" key={movie.id}>
            <div className="movie-panel" style={{
                backgroundImage: `url(${movie.background_image})`,
                objectFit: 'cover'
            }} >
                {
                    <div className="movie-grid">
                        <div className="movie-info">
                            <div className="movie-image">
                                <img src={movie.large_cover_image} onError={(e)=>{e.target.onerror = null; e.target.src="https://yts.mx/images/noposter.svg"}} width="300" height="400" />
                            </div>

                        </div>
                        <div className="movie-info-title">
                            <div className="movie-info-title">
                                <h1>{movie.title}</h1>
                                <h3>{movie.year}</h3>
                                {
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} >
                                        {
                                            movie.genres ?
                                                movie.genres.map((genre, index) => (
                                                    <h4 key={index}>{genre}&nbsp;/</h4>
                                                ))
                                                : movie.genres
                                        }
                                    </div>
                                }
                                <div className="movie-availables">
                                    <h3>Available in</h3>
                                    <div>
                                        {
                                            movie.torrents ?
                                                movie.torrents.map((torrent, index) => (
                                                    <a href={torrent.url} target="_blank"><h5 key={index}>{torrent.quality}. {torrent.type}</h5></a>
                                                ))
                                                : movie.torrents
                                        }
                                    </div>
                                </div>
                                <div className="movie-addinfo">
                                    <div className="movie-add">
                                        <h3>Dowloads: {movie.download_count}</h3>
                                    </div>
                                    <div className="movie-add">
                                        <h3>Language: {movie.language}</h3>
                                    </div>
                                    <div className="movie-add">
                                        <h3>Likes: {movie.like_count}</h3>
                                    </div>
                                    <div className="movie-add">
                                        <h3>ImDb: <a href={'https://www.imdb.com/title/' + movie.imdb_code} target="_blank">Open</a></h3>
                                    </div>
                                    <div className="movie-add">
                                        <StarIcon /> <h3>{movie.rating} / 10 </h3>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="trailers">
                {
                    <div className="movie-trailers">
                        <div className="trailer">
                            <iframe allowFullScreen="" frameBorder="0" height="315" src={`http://www.youtube.com/embed/${movie.yt_trailer_code}?start=90`} width="420"></iframe>
                        </div>
                        <div className="trailer">
                            <img src={movie.medium_screenshot_image2} />
                        </div>
                        <div className="trailer">
                            <img src={movie.medium_screenshot_image3} />
                        </div>
                    </div>
                }
            </div>

            <div className="movie-cast">
                <div className="plot-summary">
                    {
                        <div>
                            <h3>Plot summary</h3>
                            <hr style={{
                                border: '1px solid #F7F7F7'
                            }} />
                            <p>{!readFull && movie.description_full?.length > 400 ? movie.description_full?.slice(0, 400) + '...' : movie.description_full} {movie.description_full ? <Link style={{ color: '#F7F7F7', fontWeight: 'bold' }} to='#' onClick={() => setReadFull(!readFull)}>{!readFull ? 'read more' : 'collapse'}</Link> : ''}</p>
                            <h4>
                                Date uploaded: {getDate()}
                            </h4>
                        </div>
                    }
                </div>
                <hr style={{
                    border: '1px solid #F7F7F7'
                }} />
                <div className="cast">
                    {
                        <div className="cast-characters">
                            <h3>Top Cast</h3>
                            <hr style={{
                                border: '1px solid #F7F7F7'
                            }} />
                            {
                                movie.cast ?
                                    movie.cast.map((cast, index) => (
                                        <div className="cast-profile">
                                            <img src={cast.url_small_image ? cast.url_small_image : 'https://img.yts.mx/assets/images/users/thumb/default_avatar.jpg'} alt={cast.character_name} />
                                            <Link to='/'>{cast.name} as <b>{cast.character_name}</b></Link>
                                        </div>
                                    ))
                                    : ''
                            }
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}
export default Movie