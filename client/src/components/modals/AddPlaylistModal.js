import React, { useEffect, useState } from "react";
import { teacherPlaylists, spotifyToken } from "../../utils/API";
import { ADD_PLAYLIST } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

function AddPlaylistModal({ yogaClass, toggleModal }) {
	const [addPlaylist, { error }] = useMutation(ADD_PLAYLIST);

	const [playlists, setPlaylists] = useState([]);

	// TODO: error handling
	const getPlaylists = async () => {
		const token = await spotifyToken();
		const playlists = await teacherPlaylists(token);
		setPlaylists(playlists.data.items);
	};

	useEffect(() => {
		getPlaylists();
	}, []);

	const handleAddPlaylist = async (playlistId) => {
		// call db with yogaClass id and playlist id
		try {
			const { data } = await addPlaylist({
				variables: { classId: yogaClass._id, playlistId },
			});
			console.log(data);
		} catch (err) {
			console.error(err);
		}

		// TODO why doesn't this work
		toggleModal();
	};

	return (
		<div className="modal-card">
			<header className="modal-header">{yogaClass.date}</header>
			<div className="modal-content">
				{playlists && (
					<ul className="playlist-list">
						{playlists.map((playlist) => (
							<li
								onClick={() => handleAddPlaylist(playlist.id)}
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
