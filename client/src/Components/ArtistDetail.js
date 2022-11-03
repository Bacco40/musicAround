import React from "react";
import {useEffect, useState, useRef} from 'react';
import { useParams , Link} from "react-router-dom";
import axios from "axios";
import Player from "./Player";
import SingleEvent from "./SingleEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCalendarDays, faLocationDot, faShareNodes} from '@fortawesome/free-solid-svg-icons';
import {faStar} from '@fortawesome/free-regular-svg-icons'
library.add(faLocationDot, faCalendarDays,faShareNodes,faStar);


function ArtistDetail({getToken,token}){
    const {id} = useParams();
    const [artist, setArtist] = useState(null);
    const [events, setEvents] = useState(null);
    const [playlist,setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const emptyList =['', '', '', ''];
    const wrapperRef = useRef(null);
    TopDistanceAlerter(wrapperRef);

    function TopDistanceAlerter(ref) {
        useEffect(() => {
          function handleScroll(event) {
            const distanceToTop = window.pageYOffset + ref.current.getBoundingClientRect().top;
            if (distanceToTop >= 378) {
                document.querySelector('.smallArtistDetail').style.cssText='display: grid;'
            }
            else{
                if (distanceToTop <= 378) {
                    document.querySelector('.smallArtistDetail').style.cssText='display: none;'
                }
            }
          }
          document.addEventListener("scroll", handleScroll);
          return () => {
            document.removeEventListener("scroll", handleScroll);
          };
        }, [ref]);
      }

    useEffect(()=>{
        if(artist !== null){
            axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=IT`, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }}
            )
            .then(res => {
                if(res.data){
                    let playlistTemp = [{}]
                    let index = 0;
                    for(let i=0;i<res.data.tracks.length;i++){
                        if(res.data.tracks[i].preview_url)
                        {
                            playlistTemp[index]={
                                title: res.data.tracks[i].name,
                                artist: res.data.tracks[i].artists[0].name,
                                img_src: res.data.tracks[i].album.images[1].url,
                                src: res.data.tracks[i].preview_url,
                            }
                            index=index+1;
                        }
                    }
                    setPlaylist(playlistTemp)
                }
            })
        }
    },[artist])

    useEffect(()=>{
        if(artist){
            axios.get(`https://app.ticketmaster.com/discovery/v2/attractions?apikey=${process.env.REACT_APP_TICKETMASTER_KEY}&keyword=${artist.name}&locale=*`)
            .then(res => {
                if(res.data._embedded){
                    if(res.data._embedded.attractions[0].name.toLowerCase() === artist.name.toLowerCase()){
                        axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_KEY}&attractionId=${res.data._embedded.attractions[0].id}&locale=*`)
                        .then(res => {
                            if(res.data._embedded){
                                console.log(res.data);
                                setEvents(res.data._embedded.events)
                            }
                            setLoading(false)
                        })
                    }
                }
                else{
                    setLoading(false)
                }
            })
        }
    },[artist])

    useEffect(()=>{
        if(id){
            axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                  'Authorization': `Bearer ${token}` 
                }}
            )
            .then(res => {
                if(res.data){
                    setArtist(res.data)
                }
            }) 
        }
    },[id])

    return(
        <div>{artist && 
            <>
                <div className="concertPicContainer">
                    <img className="homePic artistDetailPic" src={
                        artist.images[0].width === 640 ? artist.images[0].url :
                        artist.images[1].width === 640 ? artist.images[1].url :
                        artist.images[2].width } alt={artist.name}
                    />
                </div>    
                <section className="localDetailContainer">
                    <div className="picSubtitle"><span>{artist.name}</span></div>
                    <div className="localDetail">
                        <div className="leftSide locationEvent" >
                            {events && events.map((singleElement,index)=>(
                                <SingleEvent 
                                  key={index} 
                                  singleElement={singleElement} 
                                  linkedTo = "artist" 
                                />
                            ))}
                            {events === null && loading === false &&
                                <div className="noEvents">Sorry, no events from {artist.name} are scheduled</div>
                            }
                        </div>
                        <div className="rightSide">
                            <div className="likeShare" id="likeShareLoc">
                                <div className="profileIcon" title="Add To Favorite">
                                    <FontAwesomeIcon icon="fa-regular fa-star" className="icon"/>
                                </div>
                                <div className="profileIcon" title="Share">
                                    <FontAwesomeIcon icon="fa-solid fa-share-nodes" className="icon"/>
                                </div>
                            </div>
                            <div className="blockHere" ref={wrapperRef} >
                                <div className="friendsGoing">
                                    <div className="interested">
                                        <div className="boldText">Favourite of:</div>
                                        <div className="friendList">
                                            {emptyList.map((singleElement,index)=>(
                                                <div className={`profileIconTest friend${index}`} key={index}>
                                                    {index !== 3 &&
                                                        <FontAwesomeIcon icon="fa-solid fa-user" className="iconTest"/>
                                                    }
                                                    {index === 3 &&
                                                        <p className="smallNum">+{100 - 4}</p>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="smallArtistDetail">
                                    <img className = 'artistPicSmall' src={
                                        artist.images[0].width === 640 ? artist.images[0].url :
                                        artist.images[1].width === 640 ? artist.images[1].url :
                                        artist.images[2].width } alt={artist.name}
                                    />
                                    <div className="smallDetail">
                                        <div className="topCart">
                                            <div className="smallName"><span>{artist.name}</span></div>
                                            <a target="_blank" rel="noreferrer" href={artist.external_urls.spotify}>
                                                <FontAwesomeIcon icon="fa-brands fa-spotify" className="icon2"/>
                                            </a>
                                        </div>
                                        <div className="genresContainerSmall">
                                            {artist.genres.map((singleGenre,index)=>(
                                                <React.Fragment key={index}>
                                                    {index < 2 &&
                                                        <a href='/'>{singleGenre}</a>
                                                    } 
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="playerContainer">
                                    <Player songs={playlist}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
            }
        </div>
    )
}
export default ArtistDetail