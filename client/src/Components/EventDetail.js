import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import Countdown from "react-countdown";
import Map from './Map';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCalendarDays, faCheck, faLocationDot, faShareNodes} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-regular-svg-icons'
library.add(faLocationDot, faCalendarDays,faHeart,faShareNodes,faCheck);


function EventDetail(){
    const [event,setEvent] = useState(null);
    const {id} = useParams();
    const [location,setLocation] = useState(null);
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

    useEffect(()=>{
        if(event !== null){
            setLocation({
                address: event._embedded.venues[0].name,
                lat: +event._embedded.venues[0].location.latitude,
                lng: +event._embedded.venues[0].location.longitude,
              })
        }
    },[event])

    useEffect(()=>{
        if(id){
            axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_KEY}&id=${id}&locale=*`)
            .then(res => {
                if(res.data){
                    console.log(res.data._embedded.events[0])
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
                            <div className="location">
                                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                                {format(new Date(event.dates.start.dateTime), `E d LLL y - 'h' k:mm`)}
                            </div>
                            <div className="location">
                                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                                {event._embedded.venues[0].name}, {event._embedded.venues[0].city.name}
                            </div>
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
            </>
            }
        </div>
    )
}
export default EventDetail