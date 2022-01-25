import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import BasicCard from "./BasicCard";
import Badge from "@mui/material/Badge";

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
				{/* <header>
					Classes are $15 each. After submitting payment you will receive an
					email with your class zoom link!
				</header> */}
				<ul className="class-list">
					{data.map((yogaClass, idx) => (
														<Badge  
														key={idx}
														anchorOrigin={{
															vertical: 'top',
															horizontal: 'left',
														  }} badgeContent={"$15"} color="primary">

						<li>
							<Link to={`/classes/${yogaClass.class_id}`}>
								{/* {yogaClass.date} @ {yogaClass.time} */}
									<BasicCard date={yogaClass.date} time={yogaClass.time} />
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
