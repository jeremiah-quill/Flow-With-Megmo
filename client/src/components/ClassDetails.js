import React from "react";
import parseDate from '../utils/helpers/parseDate'


function ClassDetails({ date, price }) {
	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(date);

	return (
		<div className="class-card-content">
			<h2 className="card-header">Flow with Megmo</h2>
			<div className="class-card-day">
				{dayOfWeek}, {month}/{dayOfMonth}
			</div>
			<div className="class-card-day">{hour}</div>
			{price ? (
				<div className="class-card-day">${price}</div>
			) : (
				""
			)}
		</div>
	);
}

export default ClassDetails;
