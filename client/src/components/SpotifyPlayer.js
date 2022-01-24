import { useParams } from "react-router-dom";
import Button from "./Button";

function SpotifyPlayer(props) {
	// const playlistURL = `https://open.spotify.com/embed/playlist/${props.playlistId}`
	let { id } = useParams();

	return (
		<div className="absolute">
			<Button title={"All Playlists"} path={"/music"} />
			<iframe
				src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
				width="100%"
				height="380"
				frameBorder="0"
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
			></iframe>
		</div>
	);
}

export default SpotifyPlayer;
