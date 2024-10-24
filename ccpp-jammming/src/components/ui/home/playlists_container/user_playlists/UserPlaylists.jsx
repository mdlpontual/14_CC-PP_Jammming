import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";
import Playlist from "./playlist/Playlist";
import useUserInfo from "../../../../../hooks/user_hooks/useUserInfo";
import useCreatePlaylist from "../../../../../hooks/user_hooks/useCreatePlaylist";
import { useAddTrack } from "../../../../../hooks/user_hooks/AddTrackContext";

function UserPlaylists({ onPlaylistClick, onBackClick, onPlayButton, onArtistClick, onAlbumClick, playTrack, pauseTrack, accessToken }) {
    const { userInfo, userPlaylistsArr, setUserPlaylistsArr, refetchPlaylists, editPlaylists } = useUserInfo({ accessToken });
    const userId = userInfo.id;
    const { handleCreatePlaylist } = useCreatePlaylist({ accessToken, userId, refetchPlaylists });
    const { updateTrackToAdd } = useAddTrack();

    // Handle drag over event to allow drop
    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow dropping
    };

    // Handle drop event when track is dropped onto a playlist
    const handleDrop = (event, playlist) => {
        event.preventDefault();
        const uriTrack = event.dataTransfer.getData('trackUri');
        const idTrack = event.dataTransfer.getData('trackId');
        const accessToken = event.dataTransfer.getData('accessToken');

        // Call updateTrackToAdd with dropped track and selected playlist
        updateTrackToAdd(uriTrack, idTrack, playlist, accessToken);
    };

    return (
        <div id="playlists-container" className="container-fluid d-flex flex-column">
            <header id="pl-header-row" className="row justify-content-center align-items-center">
                <div id="pl-heading-col" className="col d-flex justify-content-start align-items-center">
                    <h3>{userInfo.display_name}'s Playlists:</h3>
                </div>
                <div id="add-button-col" className="col-auto d-flex justify-content-end align-items-center">
                    <a id="create-pl-button" type="button" onClick={handleCreatePlaylist}>
                        <img src={IMG.plusPNG} alt="add playlist button" height="40px" />
                    </a>
                </div>
            </header>
            <main id="pl-body-row" className="row">
                <div id="pl-body-col" className="col">
                    {userPlaylistsArr.map((playlist) => (
                        <div
                            key={playlist.playlistUri}
                            onDragOver={handleDragOver} // Allow dropping
                            onDrop={(event) => handleDrop(event, playlist)} // Handle track drop
                        >
                            <Playlist
                                playlistData={playlist}
                                onPlaylistClick={onPlaylistClick}
                                onBackClick={onBackClick}
                                onPlayButton={onPlayButton}
                                onArtistClick={onArtistClick}
                                onAlbumClick={onAlbumClick}
                                playTrack={playTrack}
                                pauseTrack={pauseTrack}
                                refetchPlaylists={refetchPlaylists}
                                editPlaylists={editPlaylists}
                                setUserPlaylistsArr={setUserPlaylistsArr}
                                accessToken={accessToken}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default UserPlaylists;