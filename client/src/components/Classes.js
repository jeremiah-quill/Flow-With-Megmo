import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ClassCard from "./ClassCard";
import Badge from "@mui/material/Badge";

// TODO: should I get this data from centralized state, call database directly from useEffect, or should it be passed in by App component?
let data = [
	{ date: "2022-01-29", time: "10:00", class_id: 1 },
	{ date: "2022-01-22", time: "10:30", class_id: 2 },
	{ date: "2022-02-05", time: "10:00", class_id: 3 },
	{ date: "2022-02-05", time: "10:00", class_id: 4 },
];

function Classes() {
	return (
		<div className="classes absolute">
			<Button title={"Home"} path={"/"} />
			<div>
				<ul className="class-list">
					{data.map((yogaClass, idx) => (
						<Badge
							key={idx}
							anchorOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							badgeContent={"$15"}
							color="primary"
						>
							<li>
								<Link to={`/classes/${yogaClass.class_id}`}>
									<ClassCard date={yogaClass.date} time={yogaClass.time} />
								</Link>
							</li>
						</Badge>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Classes;
