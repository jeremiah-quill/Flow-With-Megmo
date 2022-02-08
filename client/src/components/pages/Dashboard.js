import React, { useEffect, useState } from "react";
import useToggle from "../../hooks/useToggle";
import CreateClassForm from "../forms/CreateClassForm";
import StatsOverview from "../StatsOverview";
import Modal from "../Modal";
import ListMembersModal from "../modals/ListMembersModal";
import AddPlaylistModal from "../modals/AddPlaylistModal";
import DeleteClassModal from "../modals/DeleteClassModal";
import EditClassModal from "../modals/EditClassModal";

import "../../styles/Dashboard.css"
import { QUERY_TEACHERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';



const classData = {
	currentClasses: [
		{ date: "2022-01-29", time: "10:00", class_id: "83354584725" },
		{ date: "2022-02-05", time: "12:00", class_id: 2 },
		{ date: "2022-02-05", time: "10:00", class_id: 3 },
		{ date: "2022-02-05", time: "10:00", class_id: 4 },
	],
	previousClasses: [
		{ date: "2022-01-29", time: "10:00", class_id: 1, playlist_id: 1 },
		{
			date: "2022-01-22",
			time: "10:30",
			class_id: "86527573613",
			playlist_id: "33c84T8rITyYEY63gfzPZH",
		},
		{ date: "2022-02-05", time: "10:00", class_id: 3, playlist_id: 3 },
		{ date: "2022-02-05", time: "10:00", class_id: 4, playlist_id: 68 },
	],
};

function Dashboard() {
	console.log(`start`)

	const { loading, data } = useQuery(QUERY_TEACHERS);
	const teachers = data?.teachers || [];

	const [isModal, toggleModal] = useToggle(false);
	const [modalContent, setModalContent] = useState(null);


	const configureModal = (content) => {
		toggleModal();
		setModalContent(content);
	};

	console.log(teachers)
	console.log(`end`)

	return (
		<div className="dashboard">
			<Modal show={isModal} toggleModal={toggleModal}>
				{modalContent}
			</Modal>
			<h1>Welcome back Yogi!</h1>
			{/* TODO: where should I get the stats I show in StatsOverview? fetch them from database in an onEffect and then pass them in, or fetch them within StatsOverview*/}
			<StatsOverview />
			<CreateClassForm />
			<h2>Scheduled</h2>
			{/* TODO: should this list be a component */}
			<ul className="current-class-list">
				{classData.currentClasses.map((currentClass) => (
					<li key={currentClass.class_id}>
						{currentClass.date} {currentClass.time}
						<button
							onClick={() =>
								configureModal(<ListMembersModal yogaClass={currentClass} />)
							}
						>
							View
						</button>
						<button
							onClick={() =>
								configureModal(<EditClassModal yogaClass={currentClass} />)
							}
						>
							Edit
						</button>
						<button
							onClick={() =>
								configureModal(<DeleteClassModal yogaClass={currentClass} />)
							}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
			<h2>Completed</h2>
			<ul className="previous-class-list">
				{classData.previousClasses.map((previousClass) => (
					<li key={previousClass.class_id}>
						{previousClass.date} {previousClass.time}
						<button
							onClick={() =>
								configureModal(<ListMembersModal yogaClass={previousClass} />)
							}
						>
							View
						</button>
						<button
							onClick={() =>
								configureModal(<AddPlaylistModal yogaClass={previousClass} />)
							}
						>
							Pick Playlist
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Dashboard;
