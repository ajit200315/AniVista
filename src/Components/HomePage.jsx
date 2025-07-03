import React from 'react'
import useBringAnimeInfo from '../Hooks/BringAnimeInfo'
import { Link } from 'react-router-dom'

function HomePage() {

  let UpComingAnime = useBringAnimeInfo("seasons/upcoming?limit=5")
  let TopAnime = useBringAnimeInfo("top/anime?limit=5")

  return (
    <>
  

    <h2>Top Anime</h2>
      <ul className='flex flex-wrap'>
        {
          TopAnime.map(anime=>(
            <Link to={`Anime/${anime.mal_id}`} key = {anime.mal_id}>
            <li className='m-10' key={anime.mal_id}>
              {anime.title_english} <img src={anime.images.jpg.image_url} alt="" />
              
            </li>
            </Link>
          )
          )
        }
      </ul>
    

    <h2>UpComing Anime</h2>
    <ul className='flex flex-wrap'>
      {
        UpComingAnime.map( anime =>(
            <Link to={`Anime/${anime.mal_id}`} key = {anime.mal_id}>
          <li className='m-10' key={anime.mal_id}>
           {anime.title_english} ({anime.score}) 
          { <img src={anime.images.jpg.image_url} alt="" /> }
         
          </li>
          </Link>
        )
        )
      }
    </ul>
    </>
  )
}

export default HomePage