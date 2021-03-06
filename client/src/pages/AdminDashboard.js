import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
	QUERY_UPCOMING_CLASSES,
	QUERY_COMPLETED_CLASSES,
} from "../utils/queries";
import { useModalContext } from "../utils/contexts/ModalContext";
import CreateClassModal from "../components/modals/CreateClassModal";
import StatsOverview from "../components/StatsOverview";
import TeacherUpcomingList from "../components/lists/TeacherUpcomingList";
import TeacherCompletedList from "../components/lists/TeacherCompletedList";

function AdminDashboard() {
	// global context
	const { configureModal } = useModalContext();

	// local state
	const [listContent, setListContent] = useState(0);

	// define queries and responses
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
		<div className="admin-page-background">
			<div className="admin-dashboard">
				<h1 className="admin-welcome">Welcome back Yogi!</h1>
				<div className="admin-square-1">
					<StatsOverview completedClasses={completedClasses} />
					<button
						className="main-btn schedule-class-btn"
						onClick={() =>
							// configureModal(<CreateClassForm refetch={refetchUpcoming} />)
							configureModal(<CreateClassModal refetch={refetchUpcoming} />)
						}
					>
						Schedule Class
					</button>
				</div>
				<div className="multiple-lists-container list-card">
					<nav className="list-nav">
						<ul className="list-nav-ul">
							<li
								className={`list-nav-item multiple-lists-nav-item ${
									listContent === 0 ? "selected-list" : ""
								}`}
								onClick={() => setListContent(0)}
							>
								Available
							</li>
							<li
								className={`list-nav-item multiple-lists-nav-item ${
									listContent === 1 ? "selected-list" : ""
								}`}
								onClick={() => setListContent(1)}
							>
								Completed
							</li>
						</ul>
					</nav>
					{listContent === 0 ? (
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
			</div>
		</div>
	);
}

export default AdminDashboard;
