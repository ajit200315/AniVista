import React, { useEffect, useState } from "react";
import useBringAnimeInfo from "../Hooks/BringAnimeInfo";
import { Link } from "react-router-dom";

function HomePageHero() {
  let [loading , SetLoading] = useState(true);
  let topAiringAnime = useBringAnimeInfo("top/anime?filter=airing");
  let [ImgIndex, SetImgIndex] = useState(0);

  useEffect(
    ()=>{
      if (topAiringAnime.length > 0){
        SetLoading(false)
      }
    },[topAiringAnime]
  )

 useEffect(() => {
  const interval = setInterval(() => {
    let nextIndex = ImgIndex ; 

    for(let i = 1 ; i < 25 ; i++){
      nextIndex = (nextIndex+1)%25
      let Image = topAiringAnime[nextIndex]?.trailer?.images?.maximum_image_url 
      if(Image){
        SetImgIndex(nextIndex)
        break
      }

    }
    
  }, 10000);

  return () => clearInterval(interval); 
}, [ImgIndex, topAiringAnime]);

function ClickedPrev(){
   let nextIndex = ImgIndex ; 
    for(let i = 1 ; i < 25 ; i++){
      nextIndex = (nextIndex-1)%25
      let Image = topAiringAnime[nextIndex]?.trailer?.images?.maximum_image_url 
      if(Image){
        SetImgIndex(nextIndex)
        break
      }
}
}

function ClickedNext(){
   let nextIndex = ImgIndex ; 

    for(let i = 1 ; i < 25 ; i++){
      nextIndex = (nextIndex+1)%25
      let Image = topAiringAnime[nextIndex]?.trailer?.images?.maximum_image_url 
      if(Image){
        SetImgIndex(nextIndex)
        break
      }
    }
}


  return (
    <>
    {!loading? 
    (<div className="w-full px-4 py-10 bg-black text-green-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center bg-black rounded-lg shadow-lg p-6">
        {/* Poster Image */}
        <div className="relative w-full h-full">
          <img
            src={
              topAiringAnime[ImgIndex]?.trailer?.images?.maximum_image_url 
            }
            alt="Loading..."
            className="rounded-md shadow-md w-full object-cover"
          />
        </div>

        {/* Anime Info */}
        <div className="space-y-6">
          <span className="text-purple-300 text-sm uppercase tracking-widest">
            #Spotlight
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            {topAiringAnime[ImgIndex]?.title_english
              ? topAiringAnime[ImgIndex]?.title_english
              : topAiringAnime[ImgIndex]?.title}
          </h2>
          <p className="text-purple-300 line-clamp-4">
            {topAiringAnime[ImgIndex]?.synopsis}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-purple-300">
            <span className="px-3 py-1 bg-purple-800 rounded-full">
              Aired:{" "}
              {topAiringAnime[ImgIndex]?.aired?.prop?.from?.day
                ? `${topAiringAnime[ImgIndex]?.aired?.prop?.from?.day}/${topAiringAnime[ImgIndex]?.aired?.prop?.from?.month}/${topAiringAnime[ImgIndex]?.aired?.prop?.from?.year}`
                : "N/A"}
            </span>
            <span className="px-3 py-1 bg-purple-800 rounded-full">
              Score: {topAiringAnime[ImgIndex]?.score || "N/A"}
            </span>
            <span className="px-3 py-1 bg-purple-800 rounded-full">
              Members: {topAiringAnime[ImgIndex]?.members?.toLocaleString()}
            </span>
          </div>

          <Link
            to={`Anime/${topAiringAnime[ImgIndex]?.mal_id}`}
            key={topAiringAnime.mal_id}
            className="inline-block"
          >
            <button className="mt-4 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center mb-10 p-10">
  
            <img src='/next.png' alt="" className="size-10 rotate-180" onClick={ClickedPrev}/>
        
            <img src='/next.png' alt="" className="size-10 ml-5" onClick={ClickedNext}/>
        </div>
    </div>):(<div className="flex items-center justify-center h-screen bg-black">
          <p className="text-green-200 text-lg">Loading...</p>
        </div>)
  }
    </>
  );
}

export default HomePageHero;
