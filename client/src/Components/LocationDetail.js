import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import Map from './Map';
import Disco from './disco.jpg';
import SingleEvent from "./SingleEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCalendarDays, faLocationDot, faShareNodes} from '@fortawesome/free-solid-svg-icons';
import {faStar} from '@fortawesome/free-regular-svg-icons'
library.add(faLocationDot, faCalendarDays,faShareNodes,faStar);


function LocationDetail(){
    const [local,setLocal] = useState(null);
    const {id} = useParams();
    const [location,setLocation] = useState(null);
    const emptyList =['', '', '', ''];
    

    useEffect(()=>{
        if(local !== null){
            setLocation({
                address: local[0]._embedded.venues[0].name,
                lat: +local[0]._embedded.venues[0].location.latitude,
                lng: +local[0]._embedded.venues[0].location.longitude,
              })
        }
    },[local])

    useEffect(()=>{
        if(id){
            axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_KEY}&venueId=${id}&locale=*`)
            .then(res => {
                if(res.data){
                    console.log(res.data._embedded.events)
                    setLocal(res.data._embedded.events)
                }
            })
        }
    },[id])

    return(
        <div>{local &&
            <>
                <div className="concertPicContainer">
                    <img className="homePic localDetailPic" src={Disco} alt='local cover'/>
                </div>    
                <section className="localDetailContainer">
                    <div className="picSubtitle"><span>{local[0]._embedded.venues[0].name}</span></div>
                    <div className="localDetail">
                        <div className="leftSide locationEvent" >
                            {local.map((singleElement,index)=>(
                                <SingleEvent key={index} singleElement={singleElement}/>
                            ))}
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
                            <div className="blockHere">
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
                                <div className="location" id="locationInfo">
                                    <FontAwesomeIcon icon="fa-solid fa-location-dot"/>
                                    {local[0]._embedded.venues[0].name}, {local[0]._embedded.venues[0].city.name}
                                </div>
                                {location !== null &&
                                    <Map location={location} zoomLevel={14}/>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </>
            }
        </div>
    )
}
export default LocationDetail