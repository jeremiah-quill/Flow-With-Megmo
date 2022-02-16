import React from "react";
import ClassDetails from "../ClassDetails";
import ListMembersModal from "../modals/ListMembersModal";
import EditClassModal from "../modals/EditClassModal";
import DeleteClassModal from "../modals/DeleteClassModal";
import { useModalContext } from "../../utils/contexts/ModalContext";

function TeacherUpcomingList({ scheduledClasses }) {
	const { configureModal } = useModalContext();


	return (
		<ul className="current-class-list class-list">
			{scheduledClasses.map((scheduledClass) => (
				<li className="class-list-item" key={scheduledClass._id}>
					<ClassDetails date={scheduledClass.date} />
					<div className="class-actions">
						<button
							className="btn btn-round btn-pink"
							onClick={() =>
								configureModal(
									<ListMembersModal yogaClass={scheduledClass} />
								)
							}
						>
							View
						</button>
						<button
							className="btn btn-round btn-pink"
							onClick={() =>
								configureModal(
									<EditClassModal scheduledClass={scheduledClass} />
								)
							}
						>
							Edit
						</button>
						<button
							className="btn btn-round btn-pink"
							onClick={() =>
								configureModal(
									<DeleteClassModal scheduledClass={scheduledClass} />
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
