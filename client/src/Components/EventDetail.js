import React, { useState, useEffect} from "react";
import { useParams , Link} from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import Countdown from "react-countdown";
import Map from './Map';
import Player from "./Player";
import lineUp from './lineUp.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebookF, faInstagram, faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCalendarDays, faCheck, faLocationDot, faShareNodes} from '@fortawesome/free-solid-svg-icons';
import {faHeart, faStar} from '@fortawesome/free-regular-svg-icons'
library.add(faLocationDot, faCalendarDays,faHeart,faShareNodes,
    faCheck,faStar,faFacebookF,faSpotify,faInstagram,faYoutube);


function EventDetail({getToken,token}){
    const [event,setEvent] = useState(null);
    const [artistId, setArtistId] = useState(null);
    const [artist, setArtist] = useState(null);
    const {id} = useParams();
    const [location,setLocation] = useState(null);
    const [playlist,setPlaylist] = useState(null);
    const emptyList =['', '', '', ''];
    const Completionist = () => <span>Event Already Happened</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a complete state
        return <Completionist />;
    } else {
        // Render a countdown
        return (
            <div className="countdown">
                <div className="countTitle">Time Left</div>
                <div className="countDetail">
                    <div className="time">
                        <div className="timeNum">{days}</div>
                        <div className="timeRef"> DAYS</div>
                    </div>
                    <div className="time">
                        <div className="timeNum">{hours}</div>
                        <div className="timeRef"> HRS</div>
                    </div>
                    <div className="time">
                        <div className="timeNum">{minutes}</div>
                        <div className="timeRef"> MIN</div>
                    </div>
                    <div className="time">
                        <div className="timeNum">{seconds}</div>
                        <div className="timeRef"> SEC</div>
                    </div>
                </div>
            </div>
        );
    }
    };

    function recoveArtistId(name){
        axios.get(`https://api.spotify.com/v1/search?q=${name}&type=artist&limit=10`, {
            headers: {
            'Authorization': `Bearer ${token}` 
            }}
        )
        .then(res => {
            if(res.data){
                if(res.data.artists.items[0] !== undefined && res.data.artists.items[0].name === name){
                    setArtistId(res.data.artists.items[0].id)
                }
            }
        })
    }

    useEffect(()=>{
        if(artist !== null){
            axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=IT`, {
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
        if(token !== null){
            axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
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
    },[artistId])

    useEffect(()=>{
        if(event !== null && token !== null){
            setLocation({
                address: event._embedded.venues[0].name,
                lat: +event._embedded.venues[0].location.latitude,
                lng: +event._embedded.venues[0].location.longitude,
              })
            if(event._embedded.attractions ){
                if(event._embedded.attractions[0].externalLinks && event._embedded.attractions[0].externalLinks.spotify)
                {
                    setArtistId(event._embedded.attractions[0].externalLinks.spotify[0].url.substring(32, 54))
                }
                else{
                    recoveArtistId(event._embedded.attractions[0].name)
                }
            }
        }
    },[token])

    useEffect(()=>{
        if(id){
            axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_KEY}&id=${id}&locale=*`)
            .then(res => {
                if(res.data){
                    getToken()
                    setEvent(res.data._embedded.events[0]);
                }
            })
        }
    },[id])

    return(
        <div>{event &&
            <>
                <div className="concertPicContainer">
                    <img className="homePic eventDetailPic" src={
                        event.images[0].width === 2048 ? event.images[0].url : 
                        event.images[1].width === 2048 ? event.images[1].url :
                        event.images[2].width === 2048 ? event.images[2].url : 
                        event.images[3].width === 2048 ? event.images[3].url : 
                        event.images[4].width === 2048 ? event.images[4].url :
                        event.images[5].width === 2048 ? event.images[5].url :
                        event.images[6].width === 2048 ? event.images[6].url :
                        event.images[7].width === 2048 ? event.images[7].url :
                        event.images[8].width === 2048 ? event.images[8].url :
                        event.images[9].url} alt='event cover'
                    />
                </div>    
                <section className="eventDetailContainer">
                    <div className="picSubtitle"><span>{event.name}</span></div>
                    <div className="eventDetail">
                        <div className="leftSide">
                            {event.dates.start.dateTime &&
                                <div className="locationData">
                                    <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                                    {format(new Date(event.dates.start.dateTime), `E d LLL y - 'h' k:mm`)}
                                </div>
                            }
                            {event.dates.start.localDate && !event.dates.start.dateTime &&
                                <div className="locationData">
                                    <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                                    {format(new Date(event.dates.start.localDate), `E d LLL y`)}
                                </div>
                            }
                            <Link to={`/location/${event._embedded.venues[0].id}`} className="location" id="locationInfo">
                                <FontAwesomeIcon icon="fa-solid fa-location-dot"/>
                                {event._embedded.venues[0].name}, {event._embedded.venues[0].city.name}
                            </Link>
                            {location !== null &&
                                <Map location={location} zoomLevel={12}/>
                            }
                        </div>
                        <div className="rightSide">
                            <div className="likeShare">
                                <div className="profileIcon" title="I am Going">
                                    <FontAwesomeIcon icon="fa-solid fa-check" className="icon"/>
                                </div>
                                <div className="profileIcon" title="I am Interested">
                                    <FontAwesomeIcon icon="fa-regular fa-heart" className="icon"/>
                                </div>
                                <div className="profileIcon" title="Share">
                                    <FontAwesomeIcon icon="fa-solid fa-share-nodes" className="icon"/>
                                </div>
                            </div>
                            <div className="friendsGoing">
                                <div className="interested">
                                    <div className="boldText">Friends Interested:</div>
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
                                <div className="interested">
                                    <div className="boldText">Friends Going:</div>
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
                            <Countdown date={event.dates.start.dateTime} renderer={renderer} />
                            <a href={event.url} target="_blank" rel="noreferrer" className="buyTickets">
                                <div className="btnText">Buy Tickets</div>
                            </a>
                        </div>
                    </div>
                </section>
                {artist &&
                    <section className="lineUp">
                        <div className="eventSectionTitle">
                            <img src={lineUp} alt='Line up' className="lineUpImg"/>
                            <hr className="hrHome hrDetail"/>
                            <hr className="hrHome hrDetail2" />
                        </div>
                        <div className="artistDetail">
                            <Link to={`/artist/${artistId}`}>
                                <img className = 'artistPic' src={
                                    artist.images[0].width === 640 ? artist.images[0].url :
                                    artist.images[1].width === 640 ? artist.images[1].url :
                                    artist.images[2].width } alt={artist.name}
                                />
                            </Link>
                            <div className="eventSheet">
                                <div className="singleEventDetail">
                                    <div className="artistInfo">
                                        <Link to={`/artist/${artistId}`} className='noUnderline'>
                                            <div className='eventTitle artistName'>{artist.name}</div>
                                        </Link>
                                        <div className="genresContainer">
                                            {artist.genres.map((singleGenre,index)=>(
                                                <a key={index} href='/'>{singleGenre}</a>
                                            ))}
                                        </div>
                                        {event._embedded.attractions && event._embedded.attractions[0].externalLinks &&
                                            <div className="artistLinks">
                                                {event._embedded.attractions[0].externalLinks.instagram &&
                                                    <a className="profileIcon" target="_blank" rel="noreferrer" href={event._embedded.attractions[0].externalLinks.instagram[0].url}>
                                                        <FontAwesomeIcon icon="fa-brands fa-instagram" className="icon"/>
                                                    </a>
                                                }
                                                {event._embedded.attractions[0].externalLinks.facebook &&
                                                    <a className="profileIcon" target="_blank" rel="noreferrer" href={event._embedded.attractions[0].externalLinks.facebook[0].url}>
                                                        <FontAwesomeIcon icon="fa-brands fa-facebook-f" className="icon"/>
                                                    </a>
                                                }
                                                {event._embedded.attractions[0].externalLinks.spotify &&
                                                    <a className="profileIcon" target="_blank" rel="noreferrer" href={event._embedded.attractions[0].externalLinks.spotify[0].url}>
                                                        <FontAwesomeIcon icon="fa-brands fa-spotify" className="icon"/>
                                                    </a>
                                                }
                                                {event._embedded.attractions[0].externalLinks.youtube &&
                                                    <a className="profileIcon" target="_blank" rel="noreferrer" href={event._embedded.attractions[0].externalLinks.youtube[0].url}>
                                                        <FontAwesomeIcon icon="fa-brands fa-youtube" className="icon"/>
                                                    </a>
                                                }
                                            </div>
                                        }
                                    </div>
                                    <Player songs={playlist}/>
                                </div>
                                <div className="likeShare">
                                    <div className="profileIcon" title="Add To Favorite">
                                        <FontAwesomeIcon icon="fa-regular fa-star" className="icon"/>
                                    </div>
                                    <div className="profileIcon" title="Share">
                                        <FontAwesomeIcon icon="fa-solid fa-share-nodes" className="icon"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </>
            }
        </div>
    )
}
export default EventDetail