import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import ClassCard from "../ClassCard";

// TODO: should I get this data from centralized state, call database directly from useEffect, or should it be passed in by App component?
let data = [
	{ date: "2022-01-29", time: "10:00", class_id: "83354584725" },
	{ date: "2022-01-22", time: "10:30", class_id: 2 },
	{ date: "2022-02-05", time: "10:00", class_id: 3 },
	{ date: "2022-02-05", time: "10:00", class_id: 4 },
];

function Classes() {
	// const [classes, setClasses] = useState([])

	// useEffect(() => {
	// 	// retrieve classes from DB
	// },[])


	return (
		<div className="classes page">
			<Button title={"Home"} path={"/"} />
				<ul className="class-list">
					{data.map((yogaClass, idx) => (
							<li className="class-list-item" key={idx}>
								<Link to={`/classes/${yogaClass.class_id}`}>
									<ClassCard date={yogaClass.date} time={yogaClass.time} />
								</Link>
							</li>
					))}
				</ul>
		</div>
	);
}

export default Classes;
