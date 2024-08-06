import { useState } from 'react';
import './App.css';
import { createPlaylist, searchByKeywords } from '../services/Service';

function App() {
  const [playlistId, setPlaylistId] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [limit, setLimit] = useState(0);
  const [playlistName, setPlaylistName] = useState('');

  const doIt = async () => {
    const searchResponse = await searchByKeywords(keywords, limit);
    const songsUriList = searchResponse.items.map((x: any) => x.uri);

    const createdPlaylist = await createPlaylist(songsUriList, playlistName, "", false);
    setPlaylistId(createdPlaylist.id);
  };

  const isButtonDisabled = !keywords || !limit || !playlistName;

  return (
    <div className="container">
      <div>
        <label className="label">
          Keywords:
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="label">
          Number of Songs:
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label className="label">
          Playlist Name:
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </label>
      </div>
      <button onClick={doIt} disabled={isButtonDisabled}>Generate</button>
      {playlistId && (
        <div>
          <h3>Playlist Id: {playlistId}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
