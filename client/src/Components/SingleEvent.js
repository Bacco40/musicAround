import React from "react";
import {Link} from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCalendarDays, faCheck, faLocationDot, faShareNodes} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-regular-svg-icons'
library.add(faLocationDot, faCalendarDays,faHeart,faShareNodes,faCheck);


function SingleEvent({singleElement, linkedTo}){

    return(
        <div className="singleEvent">
            <Link to={`/event/${singleElement.id}`} className='singleEventContainer'>
                <img className="eventPicSmall" src={
                    singleElement.images[0].width === 1024 ? singleElement.images[0].url : 
                    singleElement.images[1].width === 1024 ? singleElement.images[1].url :
                    singleElement.images[2].width === 1024 ? singleElement.images[2].url : 
                    singleElement.images[3].width === 1024 ? singleElement.images[3].url : 
                    singleElement.images[4].url} alt='people at a concert'
                />
            </Link>
            <div className="eventSheet">
                <div className="singleEventDetail">
                    <div>
                        <Link to={`/event/${singleElement.id}`} className='eventTitle'>{singleElement.name}</Link>
                        {linkedTo === 'artist' &&
                            <Link to={`/location/${singleElement._embedded.venues[0].id}`} className="location" id="locationInfoSmall">
                                <FontAwesomeIcon icon="fa-solid fa-location-dot"/>
                                {singleElement._embedded.venues[0].name}, {singleElement._embedded.venues[0].city.name}
                            </Link>
                        }
                        
                        {singleElement.dates.start.dateTime &&
                            <div className="locationData">
                                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                                {format(new Date(singleElement.dates.start.dateTime), `E d LLL y - 'h' k:mm`)}
                            </div>
                        }
                        {singleElement.dates.start.localDate && !singleElement.dates.start.dateTime &&
                            <div className="locationData">
                                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                                {format(new Date(singleElement.dates.start.localDate), `E d LLL y`)}
                            </div>
                        }
                    </div>
                    <a href={singleElement.url} target="_blank" rel="noreferrer" className="buyTickets2">
                        <div className="btnText">Buy Tickets</div>
                    </a>
                </div>
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
            </div>
        </div>
    )
}

export default SingleEvent