import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCalendarDays, faLocationDot} from '@fortawesome/free-solid-svg-icons';
library.add(faLocationDot, faCalendarDays);

function LocationPin({ text }){
    return(
        <div className="pin">
            <FontAwesomeIcon icon="fa-solid fa-location-dot"  className="pin-icon" />
        </div>
    )
}
export default LocationPin
