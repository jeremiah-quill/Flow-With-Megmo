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
import ClassOnSchedule from "./list_items/ClassOnSchedule";

function Classes() {
	const { configureModal } = useModalContext();

	const { loading, data, error } = useQuery(QUERY_CLASSES);
	const classes = data?.classes || [];

	if (loading) return <div>"Loading..."</div>;
	if (error) return <div>`Error! ${error.message}`</div>;

	// console.log(classes)

	return (
		<div className="classes view">
			<ul className="class-list">
				{classes.map((yogaClass, idx) => (
					<ClassOnSchedule key={idx} classOnSchedule={yogaClass} />
				))}
			</ul>
		</div>
	);
}

export default Classes;
