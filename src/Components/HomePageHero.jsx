import React, { useEffect, useState } from "react";
import useBringAnimeInfo from "../Hooks/BringAnimeInfo";
import { Link } from "react-router-dom";

function HomePageHero() {
  const [loading, setLoading] = useState(true);
  const topAiringAnime = useBringAnimeInfo("top/anime?filter=airing");
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (topAiringAnime.length > 0) {
      setLoading(false);
    }
  }, [topAiringAnime]);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = imgIndex;
      for (let i = 1; i < 25; i++) {
        nextIndex = (nextIndex + 1) % 25;
        let image = topAiringAnime[nextIndex]?.trailer?.images?.maximum_image_url;
        if (image) {
          setImgIndex(nextIndex);
          break;
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [imgIndex, topAiringAnime]);

  const handlePrev = () => {
    let nextIndex = imgIndex;
    for (let i = 1; i < 25; i++) {
      nextIndex = (nextIndex - 1 + 25) % 25;
      let image = topAiringAnime[nextIndex]?.trailer?.images?.maximum_image_url;
      if (image) {
        setImgIndex(nextIndex);
        break;
      }
    }
  };

  const handleNext = () => {
    let nextIndex = imgIndex;
    for (let i = 1; i < 25; i++) {
      nextIndex = (nextIndex + 1) % 25;
      let image = topAiringAnime[nextIndex]?.trailer?.images?.maximum_image_url;
      if (image) {
        setImgIndex(nextIndex);
        break;
      }
    }
  };

  return (
    <>
      {!loading ? (
        <div className="w-full px-4 py-12 bg-gradient-to-b from-black via-zinc-900 to-black text-green-300">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center rounded-lg shadow-xl p-6">
            
            {/* Poster Image with fade-in animation */}
            <div className="relative w-full h-full md:max-w-[550px] lg:max-w-[620px] transition-opacity duration-700 ease-in-out">
              <img
                key={imgIndex} // force re-render to trigger transition
                src={topAiringAnime[imgIndex]?.trailer?.images?.maximum_image_url}
                alt="Poster"
                className="rounded-lg shadow-lg w-full h-auto object-cover transition-opacity duration-700 ease-in-out opacity-100"
              />
            </div>

            {/* Anime Info with slide-in animation */}
            <div className="space-y-6 animate-fadeInUp">
              <span className="text-purple-400 text-xs uppercase tracking-widest font-medium">
                #Spotlight Anime
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {topAiringAnime[imgIndex]?.title_english
                  ? topAiringAnime[imgIndex]?.title_english
                  : topAiringAnime[imgIndex]?.title}
              </h2>
              <p className="text-purple-300 text-sm md:text-base leading-relaxed max-h-20 overflow-hidden">
                {topAiringAnime[imgIndex]?.synopsis}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-purple-200">
                <span className="px-3 py-1 bg-purple-800/60 rounded-full">
                  Aired:{" "}
                  {topAiringAnime[imgIndex]?.aired?.prop?.from?.day
                    ? `${topAiringAnime[imgIndex]?.aired?.prop?.from?.day}/${topAiringAnime[imgIndex]?.aired?.prop?.from?.month}/${topAiringAnime[imgIndex]?.aired?.prop?.from?.year}`
                    : "N/A"}
                </span>
                <span className="px-3 py-1 bg-purple-800/60 rounded-full">
                  Score: {topAiringAnime[imgIndex]?.score || "N/A"}
                </span>
                <span className="px-3 py-1 bg-purple-800/60 rounded-full">
                  Members: {topAiringAnime[imgIndex]?.members?.toLocaleString()}
                </span>
              </div>

              <Link
                to={`Anime/${topAiringAnime[imgIndex]?.mal_id}`}
                className="inline-block"
              >
                <button className="mt-4 bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-transform duration-200 hover:scale-105 shadow-md">
                  View Details
                </button>
              </Link>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-8 gap-6">
            <img
              src="/next.png"
              alt="Previous"
              className="size-10 rotate-180 cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={handlePrev}
            />
            <img
              src="/next.png"
              alt="Next"
              className="size-10 cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={handleNext}
            />
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <p className="text-green-200 text-lg animate-pulse">Loading...</p>
        </div>
      )}
    </>
  );
}

export default HomePageHero;
