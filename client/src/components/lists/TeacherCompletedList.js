import React from "react";
import ListMembersModal from "../modals/ListMembersModal";
import AddPlaylistModal from "../modals/AddPlaylistModal";
import ClassDetails from "../ClassDetails";
import { useModalContext } from "../../utils/contexts/ModalContext";

function TeacherCompletedList({ completedClasses }) {
    const { configureModal } = useModalContext();

	return (
		<ul className="previous-class-list class-list">
			{completedClasses.map((completedClass) => (
				<li className="class-list-item" key={completedClass._id}>
					<ClassDetails date={completedClass.date} />
					<div className="class-actions">
						<button
                        className="btn btn-round btn-pink"
							onClick={() =>
								configureModal(<ListMembersModal yogaClass={completedClass} />)
							}
						>
							View
						</button>
						<button
                        className="btn btn-round btn-pink"
							onClick={() =>
								configureModal(
									<AddPlaylistModal completedClass={completedClass} />
								)
							}
						>
							Pick Playlist
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}

export default TeacherCompletedList;
