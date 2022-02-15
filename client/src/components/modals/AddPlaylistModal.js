import React, { useEffect, useState } from "react";
import { teacherPlaylists, spotifyToken } from "../../utils/API";
import { ADD_PLAYLIST } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useModalContext } from "../../utils/contexts/ModalContext";

function AddPlaylistModal({ yogaClass }) {
	const { resetModal } = useModalContext();

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
		resetModal()
	};

	return (
		// <div className="modal-card">
		<div className="modal-center">
			<h1>{yogaClass.date}</h1>
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
			<button className="confirm-playlist">confirm</button>
			</div>
		// </div>
	);
}

export default AddPlaylistModal;
