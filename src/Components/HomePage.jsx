import useBringAnimeInfo from "../Hooks/BringAnimeInfo";
import { Link } from "react-router-dom";
import Search from "./Search";
import Filter from "./Filter";
import UserContext from "../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import HomePageHero from "./HomePageHero";

function HomePage() {
  let UpComingAnime = useBringAnimeInfo("seasons/upcoming?limit=20");
  let TopAnime = useBringAnimeInfo("top/anime?limit=20");
  let { context } = useContext(UserContext);
  let [displayFilter, SetdisplayFilter] = useState(false);

  useEffect(() => {
    SetdisplayFilter(context?.isFiltered);
  }, [context?.isFiltered]);

  return (
    <>
      <div className="bg-black min-h-screen">
        {TopAnime.length > 0 ? (
          <div className="bg-black p-5">
            <div className="flex justify-between items-center mb-6">
              <Link to={`/`}>
                <img
                  src="/Favicon.png"
                  alt="Logo"
                  className="w-25 h-25 object-fill shadow-md"
                  onClick={() => window.location.reload()}
                />
              </Link>

              <div className="flex space-x-4 items-center">
                <Filter />
                <Search />
              </div>
            </div>

            <h2 className={displayFilter ? "text-3xl font-semibold text-green-300 mb-4" : "hidden"}>
              Filter Results
            </h2>

            <div className={displayFilter ? "flex flex-wrap justify-center gap-6 mb-12" : "hidden"}>
              {context?.BringAnime.map((anime) => (
                <Link to={`Anime/${anime.mal_id}`} key={anime.mal_id} className="block">
                  <li className="bg-black text-green-300 p-4 flex flex-col items-center rounded-lg hover:bg-green-800 transform hover:scale-105 transition-transform duration-200">
                    <span className="font-semibold text-center">
                      {anime.title_english ? anime.title_english : anime.title}
                    </span>
                    <img
                      className="w-40 h-auto mt-2 rounded-md"
                      src={anime.images.jpg.image_url}
                      alt=""
                    />
                  </li>
                </Link>
              ))}
            </div>

            <HomePageHero />

            <h2 className={!displayFilter ? 'text-3xl font-semibold text-green-300 mb-4' : 'hidden'}>
              Top Anime
            </h2>
            <ul className="flex flex-wrap justify-center gap-6 mb-12">
              {!displayFilter && TopAnime.map((anime) => (
                <Link to={`Anime/${anime.mal_id}`} key={anime.mal_id} className="block">
                  <li className="bg-black text-green-300 p-4 flex flex-col items-center rounded-lg hover:bg-green-800 transform hover:scale-105 transition-transform duration-200">
                    <span className="font-semibold text-center">
                      {anime.title_english ? anime.title_english : anime.title}
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

            <h2 className={!displayFilter ? 'text-3xl font-semibold text-green-300 mb-4' : 'hidden'}>
              UpComing Anime
            </h2>
            <ul className="flex flex-wrap justify-center gap-6">
              {!displayFilter && UpComingAnime.map((anime) => (
                <Link to={`Anime/${anime.mal_id}`} key={anime.mal_id} className="block">
                  <li className="bg-black text-green-300 p-4 flex flex-col items-center rounded-lg hover:bg-green-800 transform hover:scale-105 transition-transform duration-200">
                    <span className="font-semibold text-center">
                      {anime.title_english ? anime.title_english : anime.title}
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
        ) : (
          <div className="flex items-center justify-center min-h-screen bg-black">
            <p className="text-green-200 text-lg">Loading...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
