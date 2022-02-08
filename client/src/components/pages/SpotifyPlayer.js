import { useParams } from "react-router-dom";
import "../../styles/SpotifyPlayer.css"
import Button from "../Button";

function SpotifyPlayer() {
	let { id } = useParams();

	return (
		<div className="spotify-player">
			{/* <Button path={"/music"} /> */}
			<iframe
				src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
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
