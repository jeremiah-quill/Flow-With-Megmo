import { useParams } from "react-router-dom";
import Button from "../Button";

function SpotifyPlayer() {
	// should I pass in id through the URL params or through props?
	let { id } = useParams();

	return (
		<div className="absolute spotify-player">
			<Button path={"/music"} />
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
