import React, { useEffect, useState } from "react";
import { useUserContext } from "../../utils/contexts/UserContext";
import { TOGGLE_EMAIL } from "../../utils/mutations";
import { QUERY_SINGLE_STUDENT } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useToastContext } from "../../utils/contexts/ToastContext";

function ToggleMailingList({isSignedUp, refetchStudent}) {
	const { currentUser } = useUserContext();
    const {configureToast} = useToastContext()

    const [toggleEmail, { error: toggleEmailError }] = useMutation(TOGGLE_EMAIL);



    const [mailingList, setMailingList] = useState(isSignedUp);


    const handleMailingListchange = async (e) => {
        e.preventDefault()
		setMailingList(e.target.checked);

        try {
            const { data: toggleEmailData } = await toggleEmail({
                variables: { studentId: currentUser._id, email: currentUser.email },
            });
            
            configureToast(`You have been ${e.target.checked ? "added to" : "removed from"} our mailing list.`, "success", 5000);
			refetchStudent()
        } catch(err) {
            configureToast(err.message, "failure", 10000)
        }

	};



	return (
		<div className="dashboard-mailing-list">
			<p>Be notified when a new class is posted to the schedule&nbsp;&nbsp;</p>
			<div>
				<label className="switch">
					<input
						type="checkbox"
						checked={mailingList}
                        // value={mailingList}
						onChange={handleMailingListchange}
					/>
					<span className="slider round"></span>
				</label>
			</div>
		</div>
	);
}

export default ToggleMailingList;
