import React from "react";
import { useModalContext } from "../../utils/contexts/ModalContext";
import SpotifyPlayer from "../modals/SpotifyPlayer";
import ClassDetails from "../ClassDetails";
import "../../styles/ClassCard.css";

function CompletedClassList({ completedClasses }) {
	const { configureModal } = useModalContext();
	return (
		<ul className="student-lists class-list">
			{completedClasses.map((completedClass) => (
				<div key={completedClass._id} className="class-list-item">
					<ClassDetails date={completedClass.date} />
					<div className="class-status">Completed</div>
					<div className="class-actions">
						{completedClass.playlistId ? (
							<button
								className="btn btn-round btn-pink"
								onClick={() =>
									configureModal(
										<SpotifyPlayer playlistId={completedClass.playlistId} />
									)
								}
							>
								Playlist
							</button>
						) : (
							""
						)}
					</div>
				</div>
			))}
		</ul>
	);
}

export default CompletedClassList;
