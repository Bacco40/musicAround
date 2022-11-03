import React from "react";
import {Link} from 'react-router-dom';


function SingleElement({singleElement, linkTo}){
    return(
        <Link to={`/${linkTo}/${singleElement.id}`} className='singleElementContainer'>
            {singleElement.type === 'artist' &&
                <img className="eventPic" src={
                    singleElement.images[0].width === 640 ? singleElement.images[0].url :
                    singleElement.images[1].width === 640 ? singleElement.images[1].url :
                    singleElement.images[2].width } alt={singleElement.name}
                />
            }
            {singleElement.images[4] &&
                <img className="eventPic" src={
                    singleElement.images[0].width === 1024 ? singleElement.images[0].url : 
                    singleElement.images[1].width === 1024 ? singleElement.images[1].url :
                    singleElement.images[2].width === 1024 ? singleElement.images[2].url : 
                    singleElement.images[3].width === 1024 ? singleElement.images[3].url : 
                    singleElement.images[4].url} alt='people at a concert'
                />
            }
            <div className="eventSubContainer">
                <div className="subEvent">{singleElement.name}</div>
                {singleElement._embedded &&
                    <div className="eventLocation">{singleElement._embedded.venues[0].name}, {singleElement._embedded.venues[0].city.name}</div>
                }
            </div>
        </Link>
    )
}

export default SingleElement