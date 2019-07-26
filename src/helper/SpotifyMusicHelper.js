import Spotify from 'rn-spotify-sdk'

// Functions I don't need
// login

export const authorize = (callback) => {
    const spotifyOptions = {
        "clientId": process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        "sesssionUserDefaultKey": process.env.REACT_APP_SPOTIFY_SESSION_DEFAULT_KEY,
        "redirectURL": process.env.REACT_APP_SPOTIFY_REDIRECT_URL,
        "scopes":["user-read-private", "streaming"]
    }

    Spotify.initialize(spotifyOptions, callback);
};


