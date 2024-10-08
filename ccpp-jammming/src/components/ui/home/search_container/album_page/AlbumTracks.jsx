import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import { useTrack } from "../../../../../hooks/TrackContext";

function AlbumTracks({ trackContent, fetchedAlbumTracksArray, onPlayButton, playTrack, pauseTrack }) {
    const { currentTrackUri, isPaused } = useTrack(); 

    const uriTrack = trackContent.trackUri;
    let uriQueue = [];
    fetchedAlbumTracksArray.map(track => uriQueue.push(track.trackUri));

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    
    // Handle play/pause toggle
    const handleTogglePlay = () => {
        if (isPaused) {
            playTrack(); // Play the track
        } else {
            pauseTrack(); // Pause the track
        }
    };
    
    if(currentTrackUri !== uriTrack) {
        return (
            <>
                <div id="songs-inner-row" className="row">
                    <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                        <h5 id="number-icon">{trackContent.trackNumber}</h5>
                        <a id="play-button" type="button" onClick={() => onPlayButton(uriTrack, uriQueue)}>
                            <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="20px"/>
                        </a>
                    </div>
                    <div id="col-title" className="col d-flex justify-content-start align-items-center">
                        <h5>{trackContent.trackTitle}</h5>
                    </div>
                    <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                        <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                    </div>
                    <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                        <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                    </div>
                    <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                        <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                    </div>
                </div> 
            </>
        );
    }
    return (
        <>
            <div id="songs-inner-row-green" className="row">
                <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                    <a id="play-button" type="button" onClick={handleTogglePlay}>
                        <img id="play-icon" src={isPaused ? IMG.playPNG2Green : IMG.pausePNG2Green} alt="play icon" width="20px"/>
                    </a>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{trackContent.trackTitle}</h5>
                </div>
                <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                    <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                </div>
                <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                    <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                </div>
            </div>
        </>
    );
}

export default AlbumTracks;