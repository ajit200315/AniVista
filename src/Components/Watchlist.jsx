import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useBringAnimeInfo from "../Hooks/BringAnimeInfo";

function Watchlist() {
  const [watchList, setWatchlist] = useState([]);
  let [showPopup, SetShowPopup] = useState(false);
  const { id } = useParams();
  let animeInfo = useBringAnimeInfo(`anime/${id}`);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("numbersList")) || [];
    setWatchlist(savedList);
  }, [id]);

  function addToWatchlist() {
    const currentList = JSON.parse(localStorage.getItem("numbersList")) || [];

    if (!currentList.includes(id)) {
      const updatedList = [...currentList, animeInfo];
      localStorage.setItem("numbersList", JSON.stringify(updatedList));
      setWatchlist(updatedList);
    }
    SetShowPopup(true);
    setTimeout(() => {
      SetShowPopup(false);
    }, 3000);
  }

  return (
    <>
      {showPopup && (
        <div className="fixed top-5 right-170 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          Anime added to Bookmark!
        </div>
      )}
      <button
        onClick={addToWatchlist}
        className="bg-green-700 pl-3 pr-3 text-emerald-50 rounded-b-full hover:bg-green-500"
      >
        Add to Bookmark
      </button>
    </>
  );
}

export default Watchlist;
