import React from "react";
import ArtistResultItem from "./unit_components/ArtistResultItem";
import useFetchSearchResults from "../../../../../../hooks/useFetchSearchResults";

function ArtistResultsBox({ searchArtistResults, searchAlbumResults, searchTrackResults, onArtistClick, onAlbumClick, accessToken }) {
    const { fetchedArtistsArray } = useFetchSearchResults({ searchArtistResults, accessToken })

    return (
        <>
            <h4>artists:</h4>
            {fetchedArtistsArray.filter((artist, idx) => idx < 5).map(artist => (
                <ArtistResultItem 
                    artistContent={artist}
                    onArtistClick={onArtistClick}
                    accessToken={accessToken}
                    key={artist.artistUri}/>
            ))}
        </>
    );
}

export default ArtistResultsBox; 