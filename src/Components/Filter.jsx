import React, { useContext, useEffect, useState } from "react";
import useBringAnimeInfo from "../Hooks/BringAnimeInfo";
import UserContext from "../Context/UserContext";

function Filter() {
  const GenreList = useBringAnimeInfo("genres/anime");
  const [drop, SetDrop] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedGenreString, setSelectedGenreString] = useState("");
  const BringAnime = useBringAnimeInfo(`anime?genres=${selectedGenreString}`);
  const { SetContext } = useContext(UserContext);

  useEffect(() => {
    SetContext({
      BringAnime,
      isFiltered: selectedGenre.length > 0,
    });
  }, [BringAnime]);

  useEffect(() => {
    setSelectedGenreString(selectedGenre.join(","));
  }, [selectedGenre]);

  function ClickedBtn(e) {
    const val = e.target.value;
    if (e.target.checked) {
      setSelectedGenre([...selectedGenre, val]);
    } else {
      setSelectedGenre(selectedGenre.filter((id) => id !== val));
    }
  }

  return (
    <>
      <div className="relative inline-block text-left">
        <div className="mb-2">
          <button
            onClick={() => SetDrop(!drop)}
            className="bg-green-700 hover:bg-green-800 text-black px-4 py-2 rounded-md shadow-md transition"
          >
            Filter by Genre
          </button>
        </div>

        {drop && (
          <div className="absolute z-20 mt-2 w-64 bg-black border border-green-700 rounded-lg shadow-lg overflow-y-auto max-h-96 p-4 space-y-2">
            <h3 className="text-green-300 text-sm font-semibold mb-2">
              Select Genres:
            </h3>
            {GenreList.map((option) => (
              <label
                key={option.mal_id}
                className="flex items-center space-x-2 text-purple-300 hover:text-green-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="genre"
                  value={option.mal_id}
                  onClick={ClickedBtn}
                  className="accent-green-500"
                />
                <span>{option.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Filter;
