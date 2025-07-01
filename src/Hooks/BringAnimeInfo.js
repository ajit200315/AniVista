import React, { useEffect, useState } from "react";

function useBringAnimeInfo(){
    let [fetchData , setFetchData] = useState([]);
    let FetchingProcess = useEffect(
        ()=>{
            fetch('https://api.jikan.moe/v4/top/anime')
            .then((data)=>(data.json()))
            .then((data) =>(setFetchData(data.data)))
        },[]
    )
    return fetchData ; 
 }

export default useBringAnimeInfo; 