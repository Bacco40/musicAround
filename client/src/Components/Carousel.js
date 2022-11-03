import React from "react";
import SingleElement from "./singleElement";

function Carousel({sectionNum, elementArray, changeSection, linkTo, loading}){
    const emptyList =['', '', '', ''];
    
    return(
        <>
            {elementArray && elementArray[0] &&
            <>
            <div className="arrow leftArrow" value={sectionNum} id={elementArray[0].type === 'artist' ? 'artistCarousel' : 'eventCarousel'} onClick={(e)=>changeSection(e)}>‹</div>
            {sectionNum === 1 &&
                <div className="section" id={elementArray[0].type === 'artist' ? `sectionArtist${sectionNum}` : `sectionEvents${sectionNum}`}>
                    {elementArray.map((singleElement,index)=>(
                        <React.Fragment key={index}>
                            {index <= 3 &&
                                <SingleElement singleElement={singleElement} linkTo={linkTo}/>
                            }
                        </React.Fragment>
                    ))}
                </div>
            }
            {sectionNum === 2 &&
                <div className="section" id={elementArray[0].type === 'artist' ? `sectionArtist${sectionNum}` : `sectionEvents${sectionNum}`}>
                    {elementArray.map((singleElement,index)=>(
                        <React.Fragment key={index}>
                            {index <= 7 && index > 3 &&
                                <SingleElement singleElement={singleElement} linkTo={linkTo}/>
                            }
                        </React.Fragment>
                    ))}
                </div>
            }
            {sectionNum === 3 &&
                <div className="section" id={elementArray[0].type === 'artist' ? `sectionArtist${sectionNum}` : `sectionEvents${sectionNum}`}>
                    {elementArray.map((singleElement,index)=>(
                        <React.Fragment key={index}>
                            {index <= 11 && index > 7 &&
                                <SingleElement singleElement={singleElement} linkTo={linkTo}/>
                            }
                        </React.Fragment>
                    ))}
                </div>
            }
            {sectionNum === 4 &&
                <div className="section" id={elementArray[0].type === 'artist' ? `sectionArtist${sectionNum}` : `sectionEvents${sectionNum}`}>
                    {elementArray.map((singleElement,index)=>(
                        <React.Fragment key={index}>
                            {index <= 15 && index > 11 &&
                                <SingleElement singleElement={singleElement} linkTo={linkTo}/>
                            }
                        </React.Fragment>
                    ))}
                </div>
            }
            {sectionNum === 5 &&
                <div className="section" id={elementArray[0].type === 'artist' ? `sectionArtist${sectionNum}` : `sectionEvents${sectionNum}`}>
                    {elementArray.map((singleElement,index)=>(
                        <React.Fragment key={index}>
                            {index <= 19 && index > 15 &&
                                <SingleElement singleElement={singleElement} linkTo={linkTo}/>
                            }
                        </React.Fragment>
                    ))}
                </div>
            }
            <div className="arrow rigthArrow" value={sectionNum} id={elementArray[0].type === 'artist' ? 'artistCarousel' : 'eventCarousel'} onClick={(e)=>changeSection(e)}>›</div>
        </>
        }
        {loading === true &&
            <div className="section">
                {emptyList.map((singleElement,index)=>(
                    <div className="singleElementContainer" key={index}>
                        <div className="emptyPic"></div>
                        <div className="emptyDesc">
                            <div className="fakeText1"></div>
                            <div className="fakeText2"></div>
                        </div>
                    </div>
                ))}
            </div>
        }
    </>
    )
}

export default Carousel;