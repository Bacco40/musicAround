import React from "react";
import { useState, useMemo, useEffect} from "react";
import {AudioPlaylist} from 'ts-audio';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause} from '@fortawesome/free-solid-svg-icons';
library.add(faPlay,faPause);

function Player({songs}){
    const [isPlaying, setIsPlaying] = useState(false);

    function chooseOption(e){
        if(isPlaying === false){
            setIsPlaying(true);
            topTrack.play()
        }
        else{
            setIsPlaying(false);
            topTrack.pause()
        }
    }

    const topTrack = useMemo(() => {
        if(songs !== null){
            return AudioPlaylist({
                files: songs.map((song) => song.src),
                loop: true,
                volume: 0.5,
            });
        }
    }, [songs]);

    useEffect(() => {
        return () => {
            if(topTrack){
                topTrack.pause()
            }
        }
    }, [topTrack])

    return(
        <div className="topSongs">
            <div>Top songs preview:</div>
            {topTrack &&
                <div className="profileIcon" onClick={(e) => chooseOption(e)} id={isPlaying ? "pause" : ''}>
                    <FontAwesomeIcon icon={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"} className='icon btnPlayer'/>
                </div>
            }
        </div>
    )
}

export default Player