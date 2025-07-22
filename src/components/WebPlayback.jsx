import React, { useRef, useEffect } from 'react';

function WebPlayback(props) {
    // Use a ref for the player to avoid dependency issues
    const playerRef = useRef(null);

    useEffect(() => {
        // Create a script element to load the Spotify Web Playback SDK
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        // Callback triggered when the SDK is ready
        window.onSpotifyWebPlaybackSDKReady = () => {
            // Create a new instance of the Spotify Player
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); }, // Supply the token from props
                volume: 0.5, // Set initial volume
            });

            playerRef.current = player; // Store the player instance in the ref

            // Event listeners for the player
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error('Initialization Error:', message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error('Authentication Error:', message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error('Account Error:', message);
            });

            player.addListener('playback_error', ({ message }) => {
                console.error('Playback Error:', message);
            });

            // Connect the player to Spotify
            player.connect();
        };

        // Cleanup function to remove the script and disconnect the player
        return () => {
            if (playerRef.current) {
                playerRef.current.disconnect();
            }
            document.body.removeChild(script);
        };
    }, [props.token]); // Dependency array only includes 'props.token'

    return (
        <div className="container">
            <div className="main-wrapper">
                <h2>Spotify Web Playback</h2>
                <p>Use this player to control playback directly from your browser.</p>
            </div>
        </div>
    );
}

export default WebPlayback;
