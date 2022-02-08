import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ClassCard from "./ClassCard";
import "../styles/Classes.css"
import { QUERY_CLASSES } from '../utils/queries';
import { useQuery } from '@apollo/client';

// TODO: should I get this data from centralized state, call database directly from useEffect, or should it be passed in by App component?
let testData = [
	{ date: "2022-01-29", time: "10:00", class_id: "83354584725", price: '$15' },
	{ date: "2022-01-22", time: "10:30", class_id: 2, price: '$15' },
	{ date: "2022-02-05", time: "10:00", class_id: 3, price: '$15' },
	{ date: "2022-02-05", time: "10:00", class_id: 4, price: '$15' },
];

function Classes() {

	const { loading, data, error } = useQuery(QUERY_CLASSES);
	const classes = data?.classes || [];

	console.log(classes)

	// console.log(classes)

	// const [classes, setClasses] = useState([])

	// useEffect(() => {
	// 	// retrieve classes from DB
	// },[])

	
	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	return (
		<div className="classes">
			{/* <header>Scheduled Classes</header> */}
			{/* <Button title={"Home"} path={"/"} /> */}
				<ul className="class-list">
					{classes.map((yogaClass, idx) => (
							<li className="class-list-item" key={idx}>
								<Link to={`/classes/${yogaClass.zoomId}` } >
									<ClassCard date={yogaClass.date} price={yogaClass.price} />
								</Link>
							</li>
					))}
				</ul>
		</div>
	);
}

export default Classes;
