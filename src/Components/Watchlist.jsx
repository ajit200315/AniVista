import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import useBringAnimeInfo from '../Hooks/BringAnimeInfo';

function Watchlist() {
  const [watchList, setWatchlist] = useState([]);
  const { id } = useParams();
  let animeInfo = useBringAnimeInfo(`anime/${id}`);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('numbersList')) || [];
    setWatchlist(savedList);
  }, [id]);

  function addToWatchlist() {
    const currentList = JSON.parse(localStorage.getItem('numbersList')) || [];

    if (!currentList.includes(id)) {
      const updatedList = [...currentList, animeInfo];
      localStorage.setItem('numbersList', JSON.stringify(updatedList));
      setWatchlist(updatedList);
    }
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-6">
      <button
        onClick={addToWatchlist}
        className="bg-green-700 hover:bg-green-800 text-black font-semibold px-6 py-3 rounded-md shadow-md transition"
      >
        Add to Watchlist
      </button>
    </div>
  );
}

export default Watchlist;
