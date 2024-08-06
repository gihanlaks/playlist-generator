// Go to this: https://developer.spotify.com/
// scroll down and identify the code Section
// You probably you will be asked to login to spotify account. do so. 
// Once you see the authorization key generated inside the code, Copy that. 
// Paste it below
const token = 'Paste auth key here';

async function fetchWebApi(endpoint: any, method: any, body?: any) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();
}

// Get Top 5 Tracks: Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
export async function getTopTracks(limit: number) {
    return (await fetchWebApi(
        `v1/me/top/tracks?time_range=long_term&limit=${limit}`,
        'GET'
    )).items;
}

// Get Recommondations Based on Given Songs : Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
export async function getRecommendations(tracksIds: string[], limit: number) {
    return (await fetchWebApi(
        `v1/recommendations?limit=${limit}&seed_tracks=${tracksIds.join(',')}`,
        'GET'
    )).tracks;
}

// Save Playlist
export async function createPlaylist(tracksUri: string[], playListName: string, playListDescription: string, isPublic: boolean) {
    const { id: user_id } = await fetchWebApi('v1/me', 'GET')

    const playlist = await fetchWebApi(
        `v1/users/${user_id}/playlists`,
        'POST'
        , {
            "name": playListName,
            "description": playListDescription,
            "public": isPublic
        })

    await fetchWebApi(
        `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
        'POST'
    );

    return playlist;
}

// Search By Keyword API
export async function searchByKeywords(keywords: string, limit: number) {
    return (await fetchWebApi(
        `v1/search?q=${keywords}&type=track&limit=${limit}&offset=0`,
        'GET'
    )).tracks;
}