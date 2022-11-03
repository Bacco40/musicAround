import React, { useEffect, useState } from "react";

function HomeNav({moveToSection, linkedTo}){
    const [pages,setPages] = useState(null)

    function generateArray(start,end){
        return [...Array(end).keys()].map((el) => el + start)
    }

    useEffect(() => {
        setPages(generateArray(1,5));
    },[])

    return (
        <div className="selectedPage">
            {pages && pages.map(page => {
                return (
                    <div className="selectedContainer" value={page} key={page} onClick={(e) => moveToSection(e) }>
                        <div className={linkedTo === "event" ? "selectedSectionEvents" : "selectedSectionArtists"} value={page}></div>
                    </div>
                )
            })}
        </div>
    )
}

export default HomeNav;