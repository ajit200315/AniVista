import React, { useState } from 'react'
import useBringAnimeInfo from "../Hooks/BringAnimeInfo";

function WatchListPage() {
  let AnimeIdList = JSON.parse(localStorage.getItem("numbersList"))
  let [AnimeList , SetAnimeList] = useState([]); 

  for(let i = 0 ; i < AnimeIdList.length ; i++){
    let SingleAnime = useBringAnimeInfo("anime/{id}");
    let NowList = [...AnimeList, SingleAnime] ; 
    SetAnimeList(NowList)
  }

  console.log(AnimeList)

  return (
    <>
    konnichiwa
    </>
  )
}

export default WatchListPage