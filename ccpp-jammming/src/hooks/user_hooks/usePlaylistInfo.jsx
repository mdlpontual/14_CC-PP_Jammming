import { useState, useEffect } from "react";
import axios from "axios";

// In-memory cache for playlist tracks and save status, keyed by playlist ID
const playlistTracksCache = {};
const playlistStateCache = {}; // New cache for saved state (buttons and icon)

function usePlaylistInfo({ playlistData, accessToken, trackLimit = 100, artistLimit = 50, offset = 0 }) {
    const [playlistTracksArr, setPlaylistTracksArr] = useState([]);
    const idPlaylist = playlistData.playlistId;

    // Initialize tracks and save state from cache
    useEffect(() => {
        const fetchPlaylist = async () => {
            if (!idPlaylist || !accessToken) return;

            // Check if tracks and state for this playlist are already cached
            if (playlistTracksCache[idPlaylist]) {
                setPlaylistTracksArr(playlistTracksCache[idPlaylist]); // Use cached tracks
            } else {
                try {
                    // Fetch the playlist tracks with a limit of 100
                    const res = await axios.get(`https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        params: {
                            limit: trackLimit, // Fetch up to 100 tracks
                            offset: offset,  
                        },
                    });

                    // Extract artist IDs and ensure they are unique
                    const artistIds = [...new Set(res.data.items.map(track => track.track.artists[0]?.id))].filter(Boolean);

                    // Paginate artist requests if artist IDs exceed the limit of 50
                    const chunkedArtistIds = [];
                    for (let i = 0; i < artistIds.length; i += artistLimit) {
                        chunkedArtistIds.push(artistIds.slice(i, i + artistLimit));
                    }

                    // Fetch artist details in chunks (pagination handling)
                    const artistBanners = {};
                    for (const artistChunk of chunkedArtistIds) {
                        const artistsRes = await axios.get(`https://api.spotify.com/v1/artists`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            params: {
                                ids: artistChunk.join(','),  // Fetch the current chunk of artist IDs
                            },
                        });

                        artistsRes.data.artists.forEach(artist => {
                            artistBanners[artist.id] = artist.images[0]?.url || null;  // Store artist banner by artistId
                        });
                    }

                    // Map the playlist tracks and include artist banners
                    const tracks = res.data.items.map((track) => ({
                        trackId: track.track.id,
                        trackTitle: track.track.name,
                        trackAuthor: track.track.artists[0]?.name || "Unknown Artist", 
                        trackAlbum: track.track.album.name,
                        trackCover: track.track.album.images[track.track.album.images.length - 1]?.url || null,
                        trackUri: track.track.uri,
                        trackDuration: track.track.duration_ms,
                        artistId: track.track.artists[0]?.id || null, 
                        artistName: track.track.artists[0]?.name || "Unknown Artist",
                        artistBanner: artistBanners[track.track.artists[0]?.id] || null,
                        albumAuthor: track.track.artists[0]?.name || "Unknown Artist", 
                        albumId: track.track.album?.id || null, 
                        albumTitle: track.track.album.name,
                        albumType: track.track.album.album_type,
                        albumCover: track.track.album.images[0]?.url || null,
                    }));

                    // Cache the fetched playlist tracks
                    playlistTracksCache[idPlaylist] = tracks;
                    setPlaylistTracksArr(tracks);
                } catch (error) {
                    console.error("Error fetching playlist content:", error);
                }
            }

            // Check if the saved state (buttons, icon) is cached
            if (playlistStateCache[idPlaylist]) {
                // Restore the saved state for buttons and icon
                const { isSaved } = playlistStateCache[idPlaylist];
                setPlaylistTracksArr((prevState) => ({ ...prevState, isSaved }));  // Update saved state
            }
        };

        fetchPlaylist();
    }, [idPlaylist, accessToken, trackLimit, artistLimit, offset]);

    // Function to clear the cache for tracks and saved state
    const clearPlaylistCache = (playlistId) => {
        if (playlistTracksCache[playlistId]) {
            delete playlistTracksCache[playlistId];
        }
        if (playlistStateCache[playlistId]) {
            delete playlistStateCache[playlistId]; // Also clear the saved state cache
        }
    };

    // Function to clear the cache when tracks or state change
    const handleTrackChange = () => {
        clearPlaylistCache(idPlaylist);  // Clear both caches when track changes
    };

    return { playlistTracksArr, setPlaylistTracksArr, clearPlaylistCache, handleTrackChange };
}

export default usePlaylistInfo;