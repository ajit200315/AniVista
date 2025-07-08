import PQueue from "p-queue";
import React, { useEffect, useState } from "react";

let ApiQueue = new PQueue({interval:1000 , intervalCap:3});

function useBringAnimeInfo(endpoint){
    let [fetchData , setFetchData] = useState([]);
    useEffect(
        ()=>{
            ApiQueue.add(()=>
            fetch(`https://api.jikan.moe/v4/${endpoint}`)
            .then((data)=>data.json())
            ).then((Response)=> setFetchData(Response.data))
        },[endpoint]
    )
    return fetchData ; 
 }

export default useBringAnimeInfo; 