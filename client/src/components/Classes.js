import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ClassCard from "./ClassCard";
import "../styles/Classes.css"
import { QUERY_CLASSES } from '../utils/queries';
import { useQuery } from '@apollo/client';


function Classes() {

	const { loading, data, error } = useQuery(QUERY_CLASSES);
	const classes = data?.classes || [];
	
	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	console.log(classes)

	return (
		<div className="classes view">
				<ul className="class-list">
					{classes.map((yogaClass, idx) => (
							<li className="class-list-item" key={idx}>
								<Link to={`/classes/${yogaClass._id}` } >
									<ClassCard date={yogaClass.date} price={yogaClass.price} />
								</Link>
							</li>
					))}
				</ul>
		</div>
	);
}

export default Classes;
