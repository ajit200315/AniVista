import useBringAnimeInfo from '../Hooks/BringAnimeInfo'
import { Link } from 'react-router-dom'
import Search from './Search'

function HomePage() {
  let UpComingAnime = useBringAnimeInfo("seasons/upcoming?limit=20")
  let TopAnime = useBringAnimeInfo("top/anime?limit=20")

  return (
    <>
    <div className='bg-gray-800 p-5'>
      <Search/>
      <h2 className="text-3xl font-semibold text-gray-100 mb-4">Top Anime</h2>
      <ul className="flex flex-wrap justify-center gap-6 mb-12">
        {TopAnime.map(anime => (
          <Link
            to={`Anime/${anime.mal_id}`}
            key={anime.mal_id}
            className="block"
          >
            <li
              key={anime.mal_id}
              className="bg-gray-800 text-gray-100 p-4 flex flex-col items-center rounded-lg hover:bg-gray-700 transform hover:scale-105 transition-transform duration-200"
            >
              <span className="font-semibold text-center">
                {anime.title_english}
              </span>
              <img
                className="w-40 h-auto mt-2 rounded-md"
                src={anime.images.jpg.image_url}
                alt=""
              />
            </li>
          </Link>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-gray-100 mb-4">UpComing Anime</h2>
      <ul className="flex flex-wrap justify-center gap-6">
        {UpComingAnime.map(anime => (
          <Link
            to={`Anime/${anime.mal_id}`}
            key={anime.mal_id}
            className="block"
          >
            <li
              key={anime.mal_id}
              className="bg-gray-800 text-gray-100 p-4 flex flex-col items-center rounded-lg hover:bg-gray-700 transform hover:scale-105 transition-transform duration-200"
            >
              <span className="font-semibold text-center">
                {anime.title_english} 
              </span>
              <img
                className="w-40 h-auto mt-2 rounded-md"
                src={anime.images.jpg.image_url}
                alt=""
              />
            </li>
          </Link>
        ))}
      </ul>
      </div>
    </>
  )
}

export default HomePage
