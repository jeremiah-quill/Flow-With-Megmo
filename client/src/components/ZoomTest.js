import React, {useEffect} from 'react';

function ZoomTest() {
    useEffect(() => {
        fetch("/api/zoom/", {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				// TODO: Get back meeting details to add to state/re-render UI, as well as add to DB.  Should I add it to a central state?
				console.log(data);
			});
    }, [])
  return <div></div>;
}

export default ZoomTest;
