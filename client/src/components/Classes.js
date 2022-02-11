import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ClassCard from "./ClassCard";
import "../styles/Classes.css";
import { QUERY_CLASSES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useModalContext } from "../utils/contexts/ModalContext";
import Class from "./Class";
import ClassSignupModal from "./modals/ClassSignupModal";

function Classes() {
	const { configureModal } = useModalContext();

	const { loading, data, error } = useQuery(QUERY_CLASSES);
	const classes = data?.classes || [];

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	console.log(classes);

	const registerAction = (classId, date) => {
		configureModal(<ClassSignupModal id={classId} />);
	};

	return (
		<div className="classes view">
			<ul className="class-list">
				{classes.map((yogaClass, idx) => (
					<ClassCard
						// className="class-list-item"
						key={idx}
						classId={yogaClass._id}
						action={registerAction}
						date={yogaClass.date}
						price={yogaClass.price}
					/>
				))}
			</ul>
		</div>
	);
}

export default Classes;
