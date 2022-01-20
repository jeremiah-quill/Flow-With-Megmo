import "./App.css";
import React, { useEffect, useState } from "react";
import BraintreeDropIn from "./components/BraintreeDropIn.js";
import Navbar from "./components/Navbar.js";

function App() {
  const [currentView, setCurrentView] = useState('nav')
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		createClass(date, time);
		// reset form
		setDate("");
		setTime("");
	};

	// Create a new yoga class
	const createClass = (classDate, classTime) => {
		const classDetails = {
			topic: "Flow with Megmo",
			type: 2,
			start_time: `${classDate}T${classTime}:00`,
			duration: 60,
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

	return (
		<div>
			<div className="app-container">
				{/* <form onSubmit={handleSubmit}>
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
				</form> */}

				{/* <BraintreeDropIn
					show={showBraintreeDropIn}
					onPaymentCompleted={() => {
						setShowBraintreeDropIn(false);
					}}
				/> */}
			</div>
			<Navbar />
		</div>
	);
}

export default App;
