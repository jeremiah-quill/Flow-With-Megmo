import "../../styles/SpotifyPlayer.css";

function SpotifyPlayer({ playlistId }) {
	return (
		<div className="spotify-player">
			<iframe
				src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
				width="100%"
				height="380"
				frameBorder="0"
				// this property lets us play the full songs rather than 30 sec clips
				allow="encrypted-media"
			></iframe>
		</div>
	);
}

export default SpotifyPlayer;
