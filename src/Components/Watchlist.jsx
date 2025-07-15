import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function Watchlist() {
  const [watchList, setWatchlist] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('numbersList')) || [];
    setWatchlist(savedList);
  }, [id]);

  function addToWatchlist() {
    const currentList = JSON.parse(localStorage.getItem('numbersList')) || [];

    if (!currentList.includes(id)) {
      const updatedList = [...currentList, id];
      localStorage.setItem('numbersList', JSON.stringify(updatedList));
      setWatchlist(updatedList);
    }
  }

  return (
    <>
      <button onClick={addToWatchlist} className="bg-amber-50">
        Add to Watchlist
      </button>
    </>
  );
}

export default Watchlist;
