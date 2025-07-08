import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBringAnimeInfo from "../Hooks/BringAnimeInfo";

function AnimePage() {
  const { id } = useParams();
  let [SingleAnime, SetSingleAnime] = useState([]);
  let CharacterInfo = useBringAnimeInfo(`anime/${id}/characters`)

  useEffect(
    ()=>{
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
          .then((Response) => Response.json())
          .then((Response) => SetSingleAnime(Response.data))
    },
    [id]
  );
  console.log(CharacterInfo)
  return (
  <>
    {SingleAnime.images ? (
      <>
        <img src={SingleAnime.images.jpg.image_url} alt={SingleAnime.title} />
        <p>{SingleAnime.genres[0].name}, {SingleAnime.genres[1].name}</p>
        <p>Score : {SingleAnime.score}</p>
        <p>Rating : {SingleAnime.rating}</p>
        <p>Status : {SingleAnime.status}</p>
        <p>Aired : {SingleAnime.aired.string}</p>
        <p>Episode : {SingleAnime.episodes}</p>
        <p>{SingleAnime.synopsis}</p>
        <p>Trailer : <iframe src="" frameborder="0"></iframe></p>
          <iframe
        src= {SingleAnime.trailer.embed_url}
        allowFullScreen
      ></iframe>

      <div className="flex flex-wrap">
        <div>
          {
            CharacterInfo.map(
              characterNumber => 
                <>
                <img src={characterNumber.character.images.jpg.image_url} alt="" /> 
                <p>{characterNumber.character.name}</p>
                </>
            )
          }
        </div>
      </div>

      </>
    ) : (
      <p>Loading...</p>
    )}
  </>
);

}

export default AnimePage;
