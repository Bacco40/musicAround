import React from "react";
import {Link} from 'react-router-dom';


function SingleElement({singleElement}){
    return(
        <Link to={`/event/${singleElement.id}`} className='singleElementContainer'>
            <img className="eventPic" src={
                singleElement.images[0].width === 1024 ? singleElement.images[0].url : 
                singleElement.images[1].width === 1024 ? singleElement.images[1].url :
                singleElement.images[2].width === 1024 ? singleElement.images[2].url : 
                singleElement.images[3].width === 1024 ? singleElement.images[3].url : 
                singleElement.images[4].url} alt='people at a concert'
            />
            <div className="eventSubContainer">
                <div className="subEvent">{singleElement.name}</div>
                <div className="eventLocation">{singleElement._embedded.venues[0].name}, {singleElement._embedded.venues[0].city.name}</div>
            </div>
        </Link>
    )
}

export default SingleElement