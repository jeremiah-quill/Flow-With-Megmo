import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function Music() {
	const data = [
		{ date: "2022-01-29", time: "10:00", playlistId: "33c84T8rITyYEY63gfzPZH" },
		{ date: "2022-01-22", time: "10:30", playlistId: "1FiXOS4iAVB3aYCEU71XRC" },
		{ date: "2022-02-5", time: "10:00", playlistId: "6itkGetLQesAPNyUb9x276" },
	];

	const [showMusicDetails, setShowMusicDetails] = useState(false);
	const [previousClasses, setPreviousClasses] = useState(data);

	return (
		<div className="music absolute">
			<Button title={"Home"} path={"/"} />
			<ul className="class-list">
				{data.map((yogaClass, idx) => (
					<li key={idx} className="class-item">
						<Link to={`/playlists/${yogaClass.playlistId}`}>
							{yogaClass.date} @ {yogaClass.time}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Music;
