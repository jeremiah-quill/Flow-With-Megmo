import React from "react";
import { QUERY_SINGLE_STUDENT} from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from '../../utils/auth'

// TODO: figure out how to separate scheduled classes from completed classes
function LoggedInHome() {
    // identify currently logged in id
    const studentId = Auth.getStudent().data._id

    // find student based on student id
	const { loading, data, error } = useQuery(QUERY_SINGLE_STUDENT, {
		variables: { studentId },
	});
	const loggedInStudent = data?.getStudentById || [];


	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

    console.log(data)

	return (
		<div className="logged-in-home">
            <button onClick={() => Auth.logout()}>Logout</button>
			<h2>Welcome {loggedInStudent.firstName}</h2>
            <h3>Scheduled Classes</h3>
            {loggedInStudent.registeredClasses.length > 0 ? (
                <ul>
                    {loggedInStudent.registeredClasses.map(registeredClass => (
                        <li>{registeredClass.date}</li>
                    ))}
                </ul>
            ) : <div>You don't have any classes scheduled.</div>}
           
           <h3>Completed Classes</h3>
            {loggedInStudent.registeredClasses.length > 0 ? (
                <ul>
                    {loggedInStudent.registeredClasses.map(registeredClass => (
                        <li>{registeredClass.date}</li>
                    ))}
                </ul>
            ) : <div>You have not yet completed any classes.</div>}

		</div>
	);
}

export default LoggedInHome;
