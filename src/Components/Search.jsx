import React, { useEffect, useState } from 'react'
import useBringAnimeInfo from '../Hooks/BringAnimeInfo';
import { useDebounce } from 'use-debounce';
import { Link } from 'react-router-dom'

function Search() {
    let [Query , SetQuery] = useState('');
    const [debouncedQuery] = useDebounce(Query, 500);
    let [Results , SetResults] = useState([]);
    let [hidden , Sethidden] = useState(true);

    let Searchresult = useBringAnimeInfo(`anime?q=${debouncedQuery}`)

    function inputChange(e){
      SetQuery(e.target.value)
      if(Query == ''){
        Sethidden(true)
        SetResults(Searchresult)
      } else if(Query != ''){
        Sethidden(false)
        SetResults(Searchresult)
      }
      console.log(Results)
    }

    return (
      <>
        <input
          type="text"
          placeholder="Enter Anime Here"
          value={Query}
          onChange={inputChange}
          className="mb-5 w-full max-w-md bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />

        <div
          hidden={hidden}
          className="mt-2 w-full max-w-md bg-gray-900 border border-gray-700 rounded-md overflow-hidden z-10"
        >
          {Results.map(anime => (
            <Link to={`Anime/${anime.mal_id}`} key={anime.mal_id} className="block">
              <div className="flex items-center gap-4 p-3 hover:bg-gray-800 transition-colors duration-200">
                <span className="text-gray-100 font-medium">
                  {anime.title_english} ({anime.score})
                </span>
                <img
                  className="w-12 h-auto rounded"
                  src={anime.images.jpg.small_image_url}
                  alt=""
                />
              </div>
            </Link>
          ))}
        </div>
      </>
    )
}

export default Search
