import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";

function Watchlist() {
    let [watchList , setWatchlist] = useState([]);
    const { id } = useParams();

    function addToWatchlist(){
        setWatchlist([...watchList , id ])
    }
    
  return (
    <>
    <button onClick={addToWatchlist} className='bg-amber-50'>Add to Watchlist</button>
    </>
  )
}

export default Watchlist