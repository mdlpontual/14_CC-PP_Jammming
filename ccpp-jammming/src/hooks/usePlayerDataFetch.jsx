import React, { useState, useEffect } from "react";
import axios from "axios";

function usePlayerDataFetch({ accessToken }) {
    const [playbackState, setPlaybackState] = useState([]);
    const [currentPlayingTrack, setCurrentPlayingTrack] = useState([]);
    const [availableDevices, setAvailableDevices] = useState([]);

    /* useEffect(() => {
      const fetchPlaybackState = async () => {
        if (!accessToken) return;
  
        try {
          const res = await axios.get(`https://api.spotify.com/v1/me/player`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          });
  
          const states = res.data.map((state) => ({

          }));
  
          setPlaybackState(states);
        } catch (error) {
          console.error("Error fetching playback state:", error);
        }
      };
  
      fetchPlaybackState();
    }, [accessToken]);

    //---------------------------------------------------------------------------------------------------------

    useEffect(() => {
      const fetchCurrentPlayingTrack = async () => {
        if (!accessToken) return;
  
        try {
          const res = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          });
  
          const devices = res.data.map((device) => ({

          }));
  
          setCurrentPlayingTrack(devices);
        } catch (error) {
          console.error("Error fetching playing track:", error);
        }
      };
  
      fetchCurrentPlayingTrack();
    }, [accessToken]); */

    //---------------------------------------------------------------------------------------------------------

    useEffect(() => {
      const fetchAvailableDevices = async () => {
        if (!accessToken) return;
  
        try {
          const res = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          });
  
          const devices = res.data.devices.map((device) => ({
              deviceId: device.id,  
              deviceStatus: device.is_active,
              devicePrivateSession: device.is_private_session,
              deviceRestriction: device.is_restricted,
              deviceName: device.name,
              deviceType: device.type,
              deviceVolumePercent: device.volume_percent,
              deviceSupportsVolume: device.supports_volume
          })); 
  
          setAvailableDevices(devices);
        } catch (error) {
          console.error("Error fetching available devices:", error);
        }
      };
  
      fetchAvailableDevices();
    }, [accessToken]);


  return { playbackState, currentPlayingTrack, availableDevices }
};

export default usePlayerDataFetch;
