import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnimePage() {
  const { id } = useParams();
  let [SingleAnime, SetSingleAnime] = useState([]);

  useEffect(
    ()=>{
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
          .then((Response) => Response.json())
          .then((Response) => SetSingleAnime(Response.data))
    },
    [id]
  );


  return (
  <>
    {SingleAnime.images ? (
      <>
        <img src={SingleAnime.images.jpg.image_url} alt={SingleAnime.title} />
        <p>{SingleAnime.synopsis}</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </>
);

}

export default AnimePage;
