import React from "react";
import { Link, useParams } from "react-router-dom";
import useBringAnimeInfo from "../Hooks/BringAnimeInfo";
import Search from "./Search";
import Watchlist from "./Watchlist";
import Filter from "./Filter";

function AnimePage() {
  const { id } = useParams();
  let AllCharacterInfo = useBringAnimeInfo(`anime/${id}/characters`);
  let CharacterInfo = AllCharacterInfo.slice(0, 10);
  let SingleAnime = useBringAnimeInfo(`anime/${id}`);
  let AllAnimeRecommendation = useBringAnimeInfo(`anime/${id}/recommendations`);
  let AnimeRecommendation = AllAnimeRecommendation.slice(0, 10);

  return (
    <>
      {SingleAnime.images ? (
        <div className="bg-black text-green-300 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex">

          <div className="flex justify-between items-center mb-6">
              <Link to={`/`}>
                <img
                  src="/Favicon.png"
                  alt="Logo"
                  className="w-25 h-25 object-fill shadow-md"
    
                />
              </Link>
              </div>

              <div className="flex space-x-4 w-full justify-end">
                <Link to={'/WatchList'}>
                <button className="bg-green-700 hover:bg-green-800 text-black px-4 py-2 rounded-md shadow-md transition mb-4">
                  <img src="/Bookmark.png" alt="" className="h-auto w-7"/>
                </button>
                </Link>
               
                <Search />
              </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="space-y-4">
              <img
                src={SingleAnime.images.webp.image_url}
                alt={SingleAnime.title}
                className="w-full rounded-xl shadow-lg"
              />
              <div className="flex flex-wrap gap-2">
                {SingleAnime.genres.map((genre) => (
                  <span
                    key={genre.name}
                    className="bg-purple-600 text-green-300 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
                <Watchlist />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Score", value: SingleAnime.score },
                  { label: "Rating", value: SingleAnime.rating, sub: SingleAnime.status },
                  { label: "Aired", value: SingleAnime.aired.string, sub: `Episodes: ${SingleAnime.episodes}` }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-green-900 p-6 rounded-xl shadow-md hover:bg-green-600 transition-all"
                  >
                    <p className="text-sm font-medium text-purple-500">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold">{item.value || 'N/A'}</p>
                    {item.sub && <p className="mt-1 text-sm text-green-200">{item.sub}</p>}
                  </div>
                ))}
              </div>

              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                <p className="text-sm leading-relaxed text-purple-300">
                  {SingleAnime.synopsis}
                </p>
              </div>

              {SingleAnime.trailer?.embed_url && (
                <div className="bg-black p-6 rounded-xl shadow-lg">
                  <h2 className="text-xl font-semibold mb-3">Trailer</h2>
                  <div className="aspect-video rounded overflow-hidden">
                    <iframe
                      src={SingleAnime.trailer.embed_url}
                      allowFullScreen
                      className="w-full h-full"
                      title="Trailer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-16">
            <h2 className="text-2xl font-semibold mb-6">Characters</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {CharacterInfo.map(({ character }, i) => (
                <div
                  key={i}
                  className="bg-black rounded-xl overflow-hidden shadow-md hover:-translate-y-1 transition"
                >
                  <img
                    src={character.images.jpg.image_url}
                    alt={character.name}
                    className="w-full h-100 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm font-medium text-purple-300">{character.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-16">
            <h2 className="text-3xl font-semibold mb-6">Similar Anime</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {AnimeRecommendation.map(({ entry }) => (
                <Link
                  key={entry.mal_id}
                  to={`/Anime/${entry.mal_id}`}
                  onClick={() => window.scrollTo({ top: 0 })}
                  className="bg-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition p-2 text-center"
                >
                  <img
                    src={entry.images.jpg.image_url}
                    alt={entry.title}
                    className="w-full h-40 object-cover"
                  />
                  <p className="mt-2 text-sm font-medium text-purple-300 truncate">{entry.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <p className="text-green-200 text-lg">Loading...</p>
        </div>
      )}
    </>
  );
}

export default AnimePage;
