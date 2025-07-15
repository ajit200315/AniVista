import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Search from "./Search";

function WatchListPage() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("numbersList")) || [];
    setAnimeList(storedList);
  }, []);

  function removeFromWatchlist(mal_id) {
    const updatedList = animeList.filter((item) => item.mal_id !== mal_id);
    localStorage.setItem("numbersList", JSON.stringify(updatedList));
    setAnimeList(updatedList);
  }

  return (
    <div className="bg-black min-h-screen p-5 text-green-300">
      <div className="flex justify-between items-center mb-6">
        <Link to={`/`}>
          <img
            src="/Favicon.png"
            alt="Logo"
            className="w-25 h-25 object-fill shadow-md"
          />
        </Link>

        <div className="flex space-x-4 items-center">
          <Link to={"/WatchList"}>
            <button className="bg-green-700 hover:bg-green-800 text-black px-4 py-2 rounded-md shadow-md transition mb-4">
              <img src="/Bookmark.png" alt="Bookmark" className="h-auto w-16" />
            </button>
          </Link>
          <Filter />
          <Search />
        </div>
      </div>

      {animeList.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-6 mb-12">
          {animeList.map((anime) => (
            <li key={anime.mal_id} className="flex flex-col items-center">
              <Link to={`Anime/${anime.mal_id}`} className="block">
                <div className="bg-black text-green-300 p-4 flex flex-col items-center rounded-lg hover:bg-green-800 transform hover:scale-105 transition-transform duration-200">
                  <span className="font-semibold text-center">
                    {anime.title_english || anime.title}
                  </span>
                  <img
                    className="w-40 h-auto mt-2 rounded-md"
                    src={anime.images.jpg.image_url}
                    alt={anime.title_english || anime.title}
                  />
                </div>
              </Link>
              <button
                onClick={() => removeFromWatchlist(anime.mal_id)}
                className="bg-red-600 text-white mt-2 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Remove from Bookmark
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg mt-10 text-green-200">
          No Anime in Your Bookmark
        </p>
      )}
    </div>
  );
}

export default WatchListPage;
