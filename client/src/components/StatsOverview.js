import React from "react";

// TODO: where should this data come from?  Where should it be converted into the below details?
function StatsOverview({completedClasses}) {
	return (
		<div className="stats-overview">
			<div className="total-classes">{completedClasses.length} classes taught</div>
            <div className="gross-income">${completedClasses.length * 12} earned</div>
		</div>
	);
}

export default StatsOverview;
