import React, { useEffect, useState } from "react";
import axios from "axios";

function AddPlaylistModal({ yogaClass }) {
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		axios("https://accounts.spotify.com/api/token", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization:
					"Basic " +
					btoa(
						"6e4383b4262d4a5cb41c9e0e90f9e100" +
							":" +
							"864f85c84587428b8871708915e1f2c7"
					),
			},
			data: "grant_type=client_credentials",
			method: "POST",
		}).then((tokenResponse) => {
			axios("https://api.spotify.com/v1/users/mmm5660/playlists?limit=50", {
				method: "GET",
				headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
			}).then((playlistsResponse) => {
				console.log(playlistsResponse.data.items);

				let fetched = playlistsResponse.data.items;

				// loop through playlists, if yoga class playlist_id matches id of playlist, make playlist green to show it has been chosen for that class
				const checkedPlaylists = fetched.map((playlist) =>
					playlist.id === yogaClass.playlist_id
						? { ...playlist, chosen: true }
						: { ...playlist, chosen: false }
				);
				setPlaylists(checkedPlaylists);
			});
		});
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
