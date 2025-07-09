import React, { useState, useEffect } from "react";
import useBringAnimeInfo from "../Hooks/BringAnimeInfo";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const Searchresult = useBringAnimeInfo(`anime?q=${debouncedQuery}`);
  const [results, setResults] = useState([]);
  const [hidden, setHidden] = useState(true);

  // Update results when the debounced query or incoming data change
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
        onChange={e => setQuery(e.target.value)}
        className="w-full mb-5 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />

      {/* Only render the dropdown when it should be visible */}
      {!hidden && (
        <div className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-md overflow-y-auto max-h-64 z-10">
          {results.map(anime => (
            <Link
              to={`Anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="block"
            >
              <div className="flex items-center gap-4 p-3 hover:bg-gray-800 transition-colors duration-200">
                <span className="text-gray-100 font-medium">
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
