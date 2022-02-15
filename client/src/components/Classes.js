import "../styles/Classes.css";
import { QUERY_UPCOMING_CLASSES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ScheduledClassList from "./lists/ScheduledClassList";

function Classes() {
	const { loading, data, error, refetch } = useQuery(QUERY_UPCOMING_CLASSES, {fetchPolicy: "network-only"});
	const classes = data?.getUpcomingClasses || [];

	if (loading) return <div>"Loading..."</div>;
	if (error) return <div>`Error! ${error.message}`</div>;

	return (
		<div className="classes view">
			<ScheduledClassList scheduledClasses={classes} scheduleRefetch={refetch}/>
		</div>
	);
}

export default Classes;
