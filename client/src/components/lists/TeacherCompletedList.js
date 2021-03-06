import React from "react";
import ListMembersModal from "../modals/ListMembersModal";
import AddPlaylistModal from "../modals/AddPlaylistModal";
import ClassDetails from "../ClassDetails";
import { useModalContext } from "../../utils/contexts/ModalContext";

function TeacherCompletedList({ completedClasses, refetch }) {
	const { configureModal } = useModalContext();

	if(completedClasses.length < 1) return <div className="empty-list">You have not yet completed any classes.</div>


	return (
		<div className="multi-list-container">

		<ul className="multi-list list-card">
			{completedClasses.map((completedClass) => (
				<li className="class-list-item" key={completedClass._id}>
					<ClassDetails date={completedClass.date} />
					<div className="class-actions">
						<button
							className="main-btn view-btn"
							onClick={() =>
								configureModal(<ListMembersModal yogaClass={completedClass} />)
							}
						>
							View
						</button>
						<button
							className="main-btn playlist-btn"
							onClick={() =>
								configureModal(
									<AddPlaylistModal
										completedClass={completedClass}
										refetch={refetch}
									/>
								)
							}
						>
							Pick Playlist
						</button>
					</div>
				</li>
			))}
		</ul>
		</div>
	);
}

export default TeacherCompletedList;
