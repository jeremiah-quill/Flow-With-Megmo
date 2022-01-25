import React, {useState} from 'react';

function Dashboard() {

    const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	// Create a new yoga class
	const createClass = (classDate, classTime) => {
		const classDetails = {
			topic: "Flow with Megmo",
			type: 2,
			start_time: `${classDate}T${classTime}:00`,
			duration: 60,
            settings: {
                approval_type: 0,
                registration_type: 2
            }
		};

		// Send post request to express server with data from form
		fetch("/api", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(classDetails),
		})
			.then((response) => response.json())
			.then((data) => {
				// TODO: Get back meeting details to add to state/re-render UI
				console.log(data);
			});
	};

    const handleSubmit = (e) => {
		e.preventDefault();
		createClass(date, time);
		// reset form
		setDate("");
		setTime("");
	};

  return <div>
      			{/* <div className="app-container"> */}
			<form onSubmit={handleSubmit}>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<input
						type="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
					/>
					<input type="submit" value="Create Class" />
				</form>
			{/* </div> */}
  </div>;
}

export default Dashboard;
