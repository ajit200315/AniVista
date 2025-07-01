import './App.css'
import useBringAnimeInfo from './Hooks/BringAnimeInfo'

function App() {

  let AnimeInfo = useBringAnimeInfo()
  console.log(AnimeInfo);
  return (
    <>
    <h2>Top Anime</h2>
    <ul className='flex flex-wrap'>
      {
        AnimeInfo.map( anime =>(
          <li className='m-10' key={anime.mal_id}>{anime.rank}) {anime.title_english} ({anime.score}) ::- {(anime.genres[0].name)}
          { <img src={anime.images.jpg.image_url} alt="" /> }
          </li>
        )
        )
      }
    </ul>
    </>
  )
}

export default App
