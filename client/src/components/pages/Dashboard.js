import React, { useState } from "react";
import CreateClassForm from "../forms/CreateClassForm";
import StatsOverview from "../StatsOverview";
import ListMembersModal from "../modals/ListMembersModal";
import AddPlaylistModal from "../modals/AddPlaylistModal";
import DeleteClassModal from "../modals/DeleteClassModal";
import EditClassModal from "../modals/EditClassModal";
import "../../styles/Dashboard.css"
import { useQuery } from '@apollo/client';
import { QUERY_CLASSES } from '../../utils/queries';
import { useModalContext } from "../../utils/contexts/ModalContext";


function Dashboard() {
	const {configureModal} = useModalContext()

	const { loading, data, error } = useQuery(QUERY_CLASSES);
	const classes = data?.classes || [];

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	return (
		<div className="dashboard">
			<h1>Welcome back Yogi!</h1>
			<StatsOverview />
			<CreateClassForm />
			<h2>Scheduled</h2>
			{/* TODO: should this list be a component */}
			<ul className="current-class-list">
				{classes.map((yogaClass) => (
					<li key={yogaClass._id}>
						{yogaClass.date}
						<button
							onClick={() =>
								configureModal(<ListMembersModal yogaClass={yogaClass} />)
							}
						>
							View
						</button>
						<button
							onClick={() =>
								configureModal(<EditClassModal yogaClass={yogaClass} />)
							}
						>
							Edit
						</button>
						<button
							onClick={() =>
								configureModal(<DeleteClassModal yogaClass={yogaClass} />)
							}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
			<h2>Completed</h2>
			<ul className="previous-class-list">
				{classes.map((previousClass) => (
					<li key={previousClass._id}>
						{previousClass.date}
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
