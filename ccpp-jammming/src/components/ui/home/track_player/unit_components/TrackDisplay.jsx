import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import useAdimSearchPage from "../../../../../hooks/useAdimSearchPage";

function TrackDisplay({currentTrack}) {
    const { handleArtistClick, handleAlbumClick } = useAdimSearchPage();

    let coverPicture;
    if (currentTrack.album.images[1].url) {
        coverPicture = currentTrack.album.images[1].url;
    } else {
        coverPicture = IMG.profilePlaceHolder;
    }
    
    return (
        <>
           <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                <a id="display-cover" type="button" onClick={handleAlbumClick}>
                    <img src={coverPicture} height="60px"/>
                </a>
            </div>
            <div id="col-title" className="col-auto d-flex flex-column justify-content-center align-items-start">
                <h5>{currentTrack.name}</h5>
                <a id="display-artist" type="button" onClick={handleArtistClick}>
                    <p>{currentTrack.artists[0].name}</p>
                </a>
            </div>
            <div id="col-blank" className="col"></div>
        </>
    );
}

export default TrackDisplay;