import React from 'react';

function Confirm({confirmAction, meetingId}) {


  return <button onClick={()=> confirmAction(meetingId)}>Confirm</button>;
} 

export default Confirm;
