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
console.log(BringAnime)

  return (
    <>
    <div className="relative inline-block text-left">
          <div className="mb-2">
            <button
              onClick={() => SetDrop(!drop)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md transition"
            >
              Filter by Genre
            </button>
          </div>
    
          {drop && (
            <div className="absolute z-20 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-y-auto max-h-96 p-4 space-y-2">
              <h3 className="text-gray-100 text-sm font-semibold mb-2">
                Select Genres:
              </h3>
              {GenreList.map((option) => (
                <label
                  key={option.mal_id}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="genre"
                    value={option.mal_id}
                    onClick={ClickedBtn}
                    className="accent-indigo-600"
                  />
                  <span>{option.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
    {/* {
    BringAnime.length != 0 || selectedGenre.length == 0   ?
    (
         
    ):(
       <h2 className={`${selectedGenre.length > 0}? absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold z-50 bg-gray-900 bg-opacity-90 : hidden`}>
  No such Anime Available
</h2>
    )
    } */}
    </>
  );
}

export default Filter;
