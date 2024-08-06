// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQA1tzFCnxwlFDiMZ-qEN_icAcOAaE88wsgwLsSTvthS5p9rgSenW11sT7Gta4Sy94lZdxXhuD2KxvuaPzJcpPR1Az4W2nbI5PHGi3APyRIblOYBYiLA4hY3b9oZOlAQ3TGgrExSGxGYnJQK8AV2i3LsMuHI-aFQD-m703v_0nQ67_88O860tJRCMv40MidvllaACCww2ttMQ0tSacs9nIR22vH_UfRpNifFk0wbxUnTfUu2LTfVpweEenvkARTj9oXKn328QMjXrFJepwUoX2LPZK6HOw';

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