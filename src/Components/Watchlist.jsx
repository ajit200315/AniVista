import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";

function Watchlist() {
    let [watchList , setWatchlist] = useState([]);
    const { id } = useParams();

    function addToWatchlist(){
       let currentList = JSON.parse(localStorage.getItem('numbersList'));
       if(Array.isArray(currentList))
       {
         setWatchlist([...currentList, id])
         localStorage.setItem('numbersList', JSON.stringify(watchList));
       }else
       {
        setWatchlist([id])
        localStorage.setItem('numbersList', JSON.stringify(watchList));
       }
    }

    console.log(watchList)
  return (
    <>
    <button onClick={addToWatchlist} className='bg-amber-50'>Add to Watchlist</button>
    </>
  )
}

export default Watchlist