import React, { useState, useEffect } from "react";
import useBringAnimeInfo from "../Hooks/BringAnimeInfo";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 250);
  const Searchresult = useBringAnimeInfo(`anime?q=${debouncedQuery}`);
  const [results, setResults] = useState([]);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      setResults(Searchresult);
      setHidden(false);
    } else {
      setResults([]);
      setHidden(true);
    }
  }, [debouncedQuery, Searchresult]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Enter Anime Here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-5 bg-black text-green-300 placeholder-purple-300 border border-green-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-700"
      />

      {!hidden && (
        <div className="absolute left-0 right-0 mt-1 bg-black border border-green-700 rounded-md overflow-y-auto max-h-64 z-10">
          {results.map((anime) => (
            <Link to={`Anime/${anime.mal_id}`} key={anime.mal_id} className="block">
              <div className="flex items-center gap-4 p-3 hover:bg-purple-900 transition-colors duration-200">
                <span className="text-green-300 font-medium">
                  {anime.title_english ?? anime.title} ({anime.score ?? "N/A"})
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
      )}
    </div>
  );
}

export default Search;
