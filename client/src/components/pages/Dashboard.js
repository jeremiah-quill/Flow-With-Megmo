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
	QUERY_UPCOMING_CLASSES,
	QUERY_COMPLETED_CLASSES,
} from "../../utils/queries";
import TeacherUpcomingList from "../lists/TeacherUpcomingList";
import TeacherCompletedList from "../lists/TeacherCompletedList";

function Dashboard() {
	// toggle between list of registered and completed classes
	const [listView, setListView] = useState("scheduled");

	const {
		loading: upcomingLoading,
		data: upcomingData,
		error: upcomingError,
		refetch: refetchUpcoming,
	} = useQuery(QUERY_UPCOMING_CLASSES);
	const upcomingClasses = upcomingData?.getUpcomingClasses || [];

	const {
		loading: completedLoading,
		data: completedData,
		error: completedError,
		refetch: refetchCompleted,
	} = useQuery(QUERY_COMPLETED_CLASSES);
	const completedClasses = completedData?.getCompletedClasses || [];

	if (upcomingLoading) return "Loading...";
	if (upcomingError) return `Error! ${upcomingError.message}`;
	if (completedLoading) return "Loading...";
	if (completedError) return `Error! ${completedError.message}`;

	return (
		<div className="logged-in-home">
			<div className="student-info">
				<h1>Welcome back Yogi!</h1>
				<StatsOverview completedClasses={completedClasses} />
				<CreateClassForm refetch={refetchUpcoming} />
			</div>

			<div className="student-lists-container">
				<div className="student-list-buttons">
					<button
						className={`list-btn ${
							listView === "scheduled" ? "selected-list" : ""
						}`}
						onClick={() => setListView("scheduled")}
					>
						Scheduled
					</button>
					<button
						className={`list-btn ${
							listView === "completed" ? "selected-list" : ""
						}`}
						onClick={() => setListView("completed")}
					>
						Completed
					</button>
				</div>
				{listView === "scheduled" ? (
					<TeacherUpcomingList
						scheduledClasses={upcomingClasses}
						refetch={refetchUpcoming}
					/>
				) : (
					<TeacherCompletedList
						completedClasses={completedClasses}
						refetch={refetchCompleted}
					/>
				)}
			</div>

			{/* <h2>Scheduled</h2>
			<TeacherUpcomingList scheduledClasses={upcomingClasses} refetch={refetchUpcoming} />
			<h2>Completed</h2>
			<TeacherCompletedList completedClasses={completedClasses} refetch={refetchCompleted} /> */}
		</div>
	);
}

export default Dashboard;
