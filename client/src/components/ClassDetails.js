import React from "react";
import parseDate from '../utils/helpers/parseDate'


function ClassDetails({ date, price }) {
	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(date);

	return (
		<div className="class-details">
			{/* <h3 className="card-header class-details-item">Flow with Megmo</h3> */}
			<div className="class-card-day class-details-item">
				{dayOfWeek}, {month}/{dayOfMonth}
			</div>
			<div className="class-card-day class-details-item">{hour}</div>
			{price ? (
				<div className="class-card-day class-details-item">${price}</div>
			) : (
				""
			)}
		</div>
	);
}

export default ClassDetails;
