import React, { useState } from "react";
import CreateClassForm from "../components/forms/CreateClassForm";
import StatsOverview from "../components/StatsOverview";
import { useQuery } from "@apollo/client";
import {
	QUERY_UPCOMING_CLASSES,
	QUERY_COMPLETED_CLASSES,
} from "../utils/queries";
import TeacherUpcomingList from "../components/lists/TeacherUpcomingList";
import TeacherCompletedList from "../components/lists/TeacherCompletedList";
import { useModalContext } from "../utils/contexts/ModalContext";

function AdminDashboard({ width, breakpoint }) {
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
		<div className="main-section admin-dashboard">
			<h1 className="admin-welcome">Welcome back Yogi!</h1>
			<div className="admin-square-1">
				<StatsOverview completedClasses={completedClasses} />
				<button
					className="main-btn schedule-class-btn"
					onClick={() =>
						configureModal(<CreateClassForm refetch={refetchUpcoming} />)
					}
				>
					Schedule Class
				</button>
			</div>
			{width < breakpoint ? (
				<div className="multiple-lists-container">
					<nav className="list-nav">
						<ul className="list-nav-ul">
							<li
								className="list-nav-item multiple-lists-nav-item"
								onClick={() => setListContent(0)}
							>
								Available
							</li>
							<li
								className="list-nav-item multiple-lists-nav-item"
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
			) : (
				<div className="lists-container">
					<TeacherUpcomingList
						scheduledClasses={upcomingClasses}
						refetch={refetchUpcoming}
					/>
					<TeacherCompletedList
						completedClasses={completedClasses}
						refetch={refetchCompleted}
					/>
				</div>
			)}
		</div>
	);
}

export default AdminDashboard;
