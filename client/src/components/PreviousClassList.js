import React, { useState } from "react";
import SpotifyPlayer from "./SpotifyPlayer";

function PreviousClassList(props) {
	const { classes } = props;
	const [showPlayer, setShowPlayer] = useState("");

	return (
		<>
			{!showPlayer ? (
				<ul className="class-list">
					{classes.map((yogaClass, idx) => (
						<li key={idx}
							onClick={() => setShowPlayer(yogaClass.playlistId)}
							className="class-item"
						>
							{yogaClass.date} @ {yogaClass.time}
						</li>
					))}
				</ul>
			) : (
				<SpotifyPlayer playlistId={showPlayer} />
			)}
		</>
	);
}

export default PreviousClassList;
