import React from "react";
import { useParams } from "react-router-dom";

function StudentDashboard() {
    const {studentId} = useParams()

    console.log(studentId)

	return <div>this is the student dashboard</div>;
}

export default StudentDashboard;
