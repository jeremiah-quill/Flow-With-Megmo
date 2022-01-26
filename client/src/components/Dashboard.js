import React, { useState } from "react";
import useToggle from "../hooks/useToggle";
import CreateClassForm from "./CreateClassForm";
import StatsOverview from "./StatsOverview";
import Modal from "./Modal";
import ParticipantList from "./ParticipantList";

// TODO: should I get this data from centralized state, call database directly from useEffect, or should it be passed in by App component?
const currentParticipants = [
	{ firstName: "pat", lastName: "quill", email: "pmquill2@charter.net" },
	{ firstName: "pat", lastName: "quill", email: "pmquill2@charter.net" },
	{ firstName: "pat", lastName: "quill", email: "pmquill2@charter.net" },
	{ firstName: "pat", lastName: "quill", email: "pmquill2@charter.net" },
];
const previousParticipants = [
	{ firstName: "carlie", lastName: "sperry", email: "pmquill2@charter.net" },
	{ firstName: "carlie", lastName: "sperry", email: "pmquill2@charter.net" },
	{ firstName: "carlie", lastName: "sperry", email: "pmquill2@charter.net" },
	{ firstName: "carlie", lastName: "sperry", email: "pmquill2@charter.net" },
];

const classData = {
	currentClasses: [
		{ date: "2022-01-29", time: "10:00", class_id: 1 },
		{ date: "2022-01-22", time: "10:30", class_id: 2 },
		{ date: "2022-02-05", time: "10:00", class_id: 3 },
		{ date: "2022-02-05", time: "10:00", class_id: 4 },
	],
	previousClasses: [
		{ date: "2022-01-29", time: "10:00", class_id: 1 },
		{ date: "2022-01-22", time: "10:30", class_id: 2 },
		{ date: "2022-02-05", time: "10:00", class_id: 3 },
		{ date: "2022-02-05", time: "10:00", class_id: 4 },
	],
};

function Dashboard() {
	const [isModal, toggleModal] = useToggle(false);
	const [modalData, setModalData] = useState({});

	// TODO: where do I put these functions, how can I make this modal better: these are the methods that "setup" what the modal should look like in each situation (view classlist from current or previous class, edit a scheduled class, delete a scheduled class, pick a playlist for a class)
	const viewCurrent = (currentClass) => {
		toggleModal();
		const title = `${currentClass.date} @ ${currentClass.time}`;
		const content = <ParticipantList participants={currentParticipants} />;
		const footer = "none";
		setModalData({ title, content, footer });
		// TODO: should I reset modalData here?
	};

	const viewPrevious = (previousClass) => {
		toggleModal();
		const title = `${previousClass.date} @ ${previousClass.time}`;
		const content = <ParticipantList participants={previousParticipants} />;
		const footer = "none";
		setModalData({ title, content, footer });
	};

	const deleteClass = (currentClass) => {
		toggleModal();
		const title = `${currentClass.date} @ ${currentClass.time}`;
		const content = "Are you sure you want to delete this class?";
		const footer = "confirm";
		setModalData({ title, content, footer });
	};

	const editClass = (currentClass) => {
		toggleModal();
		const title = `${currentClass.date} @ ${currentClass.time}`;
		const content = <CreateClassForm classDetails={currentClass} />;
		const footer = "confirm";
		setModalData({ title, content, footer });
	};

	const choosePlaylist = (previousClass) => {
		toggleModal();
		const title = `${previousClass.date} @ ${previousClass.time}`;
		const content = "choose which playlist you used for this class";
		const footer = "none";
		setModalData({ title, content, footer });
	};

	return (
		<div className="dashboard">
			{/* TODO: should I pass in "show" as a prop to Modal, or just conditionally render it here based on isModal? */}
			<Modal show={isModal} toggleModal={toggleModal} modalData={modalData} />
			<h1>Welcome back Yogi!</h1>
      {/* TODO: where should I get these stats? fetch them from database in an onEffect and then pass them in?*/}
			<StatsOverview />
			<CreateClassForm />
			<h2>current classes</h2>
			<ul className="current-class-list">
				{classData.currentClasses.map((currentClass) => (
					<li key={currentClass.class_id}>
						{currentClass.date} {currentClass.time}
						<button onClick={() => viewCurrent(currentClass)}>view</button>
						<button onClick={() => editClass(currentClass)}>edit</button>
						<button onClick={() => deleteClass(currentClass)}>delete</button>
					</li>
				))}
			</ul>
			<h2>previous classes</h2>
			<ul className="previous-class-list">
				{classData.previousClasses.map((previousClass) => (
					<li key={previousClass.class_id}>
						{previousClass.date} {previousClass.time}
						<button onClick={() => viewPrevious(previousClass)}>view</button>
						<button onClick={() => choosePlaylist(previousClass)}>
							choose playlist
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Dashboard;
