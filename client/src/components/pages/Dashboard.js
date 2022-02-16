import React, { useState } from "react";
import CreateClassForm from "../forms/CreateClassForm";
import StatsOverview from "../StatsOverview";
// import ListMembersModal from "../modals/ListMembersModal";
// import AddPlaylistModal from "../modals/AddPlaylistModal";
// import DeleteClassModal from "../modals/DeleteClassModal";
// import EditClassModal from "../modals/EditClassModal";
import "../../styles/Dashboard.css";
import { useQuery } from "@apollo/client";
import {
	QUERY_CLASSES,
	QUERY_UPCOMING_CLASSES,
	QUERY_COMPLETED_CLASSES,
} from "../../utils/queries";
import { useModalContext } from "../../utils/contexts/ModalContext";
import UserButtons from "../UserButtons";
import TeacherUpcomingList from "../lists/TeacherUpcomingList";
import TeacherCompletedList from "../lists/TeacherCompletedList";

function Dashboard() {
	const { configureModal } = useModalContext();

	const {
		loading: upcomingLoading,
		data: upcomingData,
		error: upcomingError,
	} = useQuery(QUERY_UPCOMING_CLASSES);
	const upcomingClasses = upcomingData?.getUpcomingClasses || [];

	const {
		loading: completedLoading,
		data: completedData,
		error: completedError,
	} = useQuery(QUERY_COMPLETED_CLASSES);
	const completedClasses = completedData?.getCompletedClasses || [];

	if (upcomingLoading) return "Loading...";
	if (upcomingError) return `Error! ${upcomingError.message}`;
	if (completedLoading) return "Loading...";
	if (completedError) return `Error! ${completedError.message}`;

	return (
		<div className="dashboard">
			<UserButtons />
			<h1>Welcome back Yogi!</h1>
			<StatsOverview completedClasses={completedClasses}/>
			<CreateClassForm />
			<h2>Scheduled</h2>
			<TeacherUpcomingList scheduledClasses={upcomingClasses} />
			<h2>Completed</h2>
			<TeacherCompletedList completedClasses={completedClasses} />
		</div>
	);
}

export default Dashboard;
