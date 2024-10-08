import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../../../hooks/TrackContext";

function TopTrack({ topTrack, order, onPlayButton, playTrack, pauseTrack, fetchedArtistTopTracksArray }) {
    const { currentTrackUri, isPaused } = useTrack(); 

    const uriTrack = topTrack.trackUri;
    let uriQueue = [];
    fetchedArtistTopTracksArray.map(track => uriQueue.push(track.trackUri));

    let cover;
    if (topTrack.trackCover) {
        cover = topTrack.trackCover;
    } else {
        cover = IMG.placeHolders;
    }
    
    // Handle play/pause toggle
    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    if(currentTrackUri !== uriTrack) {
        return (
            <>
                <div id="songs-inner-row" className="row">
                    <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{order + 1}</p>
                        <a id="play-button" type="button" onClick={() => onPlayButton(uriTrack, uriQueue)}>
                            <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="20px"/>
                        </a>
                    </div>
                    <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                        <img src={cover} height="40px"/>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{topTrack.trackTitle}</h5>
                    </div>
                    <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                        <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                    </div>
                    <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                        <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(topTrack.trackDuration)}</p>
                    </div>
                </div> 
            </>
        );
    }
    return (
        <>
            <div id="songs-inner-row-green" className="row">
                <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                    <a id="play-button" className="d-flex justify-content-center align-items-center" type="button" onClick={handleTogglePlay}>
                        <img id="play-icon" className="d-flex justify-content-center align-items-center" src={isPaused ? IMG.playPNG2Green : IMG.pausePNG2Green} alt="play icon" width="20px"/>
                    </a>
                </div>
                <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={cover} height="40px"/>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{topTrack.trackTitle}</h5>
                </div>
                <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                    <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                </div>
                <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                    <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(topTrack.trackDuration)}</p>
                </div>
            </div> 
        </>
    );
}

export default TopTrack;