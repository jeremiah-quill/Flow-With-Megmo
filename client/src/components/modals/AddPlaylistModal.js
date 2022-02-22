import React, { useEffect, useState } from "react";
import { teacherPlaylists, spotifyToken } from "../../utils/API";
import { ADD_PLAYLIST } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useModalContext } from "../../utils/contexts/ModalContext";
import { useToastContext } from "../../utils/contexts/ToastContext";

function AddPlaylistModal({ completedClass, refetchPlaylists, refetch }) {
	const { resetModal } = useModalContext();
	const { configureToast } = useToastContext();


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
		// call db with completedClass id and playlist id
		try {
			const { data } = await addPlaylist({
				variables: { classId: completedClass._id, playlistId },
			});
			console.log(data);
		} catch (err) {
			console.error(err);
		}

		// TODO why doesn't this work
		refetch()
		configureToast("You have successfully added a playlist to this class.", "success", 5000)
		resetModal();
	};

	return (
		<div className="add-playlist-modal">
			<h1 className="modal-title">Choose Playlist</h1>
			<div className="modal-content">
				{playlists && (
					<ul className="playlist-list">
						{playlists.map((playlist) => (
							<li
								onClick={() => handleAddPlaylist(playlist.id)}
								key={playlist.id}
								className={`playlist-item ${completedClass.playlistId === playlist.id ?  "chosen" : ""}`}
							>
								{playlist.name}
							</li>
						))}
					</ul>
				)}
			</div>
			{/* <button className="main-btn modal-btn">confirm</button> */}
		</div>
	);
}

export default AddPlaylistModal;
