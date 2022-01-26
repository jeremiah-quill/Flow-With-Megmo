import React from "react";
import CreateClassForm from "./CreateClassForm";
import StatsOverview from "./StatsOverview";

function Dashboard({data}) {

	return (
		<div className="dashboard">
			<h1>Welcome back Yogi!</h1>
			<StatsOverview />
			<CreateClassForm />
			<h2>current classes</h2>
			<ul className="current-class-list">
        {data.currentClasses.map(currentClass => 
          <li key={currentClass.class_id}>{currentClass.date} {currentClass.time}</li>
        )}
			</ul>
			<h2>previous classes</h2>
			<ul className="previous-class-list">
      {data.previousClasses.map(previousClass => 
          <li key={previousClass.class_id}>{previousClass.date} {previousClass.time}</li>
        )}
			</ul>
		</div>
	);
}

export default Dashboard;
