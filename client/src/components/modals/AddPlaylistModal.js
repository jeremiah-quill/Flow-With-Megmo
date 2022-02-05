import React, { useEffect, useState } from "react";
import {teacherPlaylists, spotifyToken} from "../../utils/API";

function AddPlaylistModal({ yogaClass }) {
	const [playlists, setPlaylists] = useState([]);

	// TODO: error handling
	const getPlaylists = async () => {
		const token = await spotifyToken();
		const playlists = await teacherPlaylists(token);
		setPlaylists(playlists.data.items)
	}


	useEffect(() => {
		getPlaylists();
	}, []);

	return (
		<div className="modal-card">
			<header className="modal-header">
				{yogaClass.date} @ {yogaClass.time}
			</header>
			<div className="modal-content">
				{playlists && (
					<ul className="playlist-list">
						{playlists.map((playlist) => (
							<li
								key={playlist.id}
								className={`playlist-item ${playlist.chosen && "chosen"}`}
							>
								{playlist.name}
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="modal-footer">confirm</div>
		</div>
	);
}

export default AddPlaylistModal;
