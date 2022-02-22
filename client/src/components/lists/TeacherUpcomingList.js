import React from "react";
import ClassDetails from "../ClassDetails";
import ListMembersModal from "../modals/ListMembersModal";
import EditClassModal from "../modals/EditClassModal";
import DeleteClassModal from "../modals/DeleteClassModal";
import { useModalContext } from "../../utils/contexts/ModalContext";

function TeacherUpcomingList({ scheduledClasses, refetch }) {
	const { configureModal } = useModalContext();


	return (
		<ul className="student-lists class-list">
			{scheduledClasses.map((scheduledClass) => (
				<li className="class-list-item" key={scheduledClass._id}>
					<ClassDetails date={scheduledClass.date} />
					<div className="class-actions">
						<button
							className="main-btn"
							onClick={() =>
								configureModal(
									<ListMembersModal yogaClass={scheduledClass} />
								)
							}
						>
							View
						</button>
						<button
							className="main-btn"
							onClick={() =>
								configureModal(
									<EditClassModal scheduledClass={scheduledClass} refetch={refetch} />
								)
							}
						>
							Edit
						</button>
						<button
							className="main-btn"
							onClick={() =>
								configureModal(
									<DeleteClassModal scheduledClass={scheduledClass} refetch={refetch} />
								)
							}
						>
							Delete
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}

export default TeacherUpcomingList;
