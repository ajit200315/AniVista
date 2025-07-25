import PQueue from "p-queue";
import React, { useEffect, useState } from "react";
import { fetchWithRetry } from "../utils/FetchWithRetry";

let ApiQueue = new PQueue({interval:1000 , intervalCap:3});



function useBringAnimeInfo(endpoint){
    let [fetchData , setFetchData] = useState([]);
    useEffect(
        ()=>{
            ApiQueue.add(()=>
            fetchWithRetry(`https://api.jikan.moe/v4/${endpoint}`)
            .then((data)=>data.json()).then((Response)=> Response.data)
            .then((Response)=>
                        setFetchData(Response)
                    
                
            )
        )
        },[endpoint]
    )
    return fetchData ; 
 }

export default useBringAnimeInfo; 

