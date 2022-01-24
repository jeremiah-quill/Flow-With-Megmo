import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function Classes() {
	let data = [
		{ date: "2022-01-29", time: "10:00", class_id: 1 },
		{ date: "2022-01-22", time: "10:30", class_id: 2 },
		{ date: "2022-02-5", time: "10:00", class_id: 3 },
	];

	return (
		<div className="classes absolute">
			<Button title={"Home"} path={"/"} />
			<div>
				<header>
					Classes are $15 each. After submitting payment you will receive an
					email with your class zoom link!
				</header>
				<ul className="class-list">
					{data.map((yogaClass, idx) => (
						<li key={idx} className="class-item">
							<Link to={`/classes/${yogaClass.class_id}`}>
								{yogaClass.date} @ {yogaClass.time}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Classes;
