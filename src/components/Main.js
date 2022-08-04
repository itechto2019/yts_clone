import MoviesList from "../MoviesFetch/MoviesList"
const Main = () => {
    return (
        <main>
            <div className="app-info">
                <h1>Download YTS YIFY movies: HD smallest size</h1>
                <p>Welcome to the official YTS.MX (.LT) website. Here you can browse and download YIFY movies in <br></br> excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. YTS Movies Torrents.</p>
            </div>
            <MoviesList />
        </main>
    )
}
export default Main