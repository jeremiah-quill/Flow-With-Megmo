import React from "react";
import UserButtons from "../components/UserButtons";

function Home() {
	return (
		<header className="main-header">
			<div className="hero">
				<div className="main-title-container">
				<h1 className="main-title">Flow with Megmo</h1>

					{/* <div className="triangle">
						<div className="arrow-up"></div>
						<div className="arrow-down"></div>
						<div className="arrow-left"></div>
						<div className="arrow-right"></div>
					</div> */}

					{/* <h2>get a  yoga experience</h2> */}
					<div className="title-btns">
						<UserButtons />
					</div>
				</div>
			</div>
		</header>
	);
}

export default Home;

/* <div className="login-signup-button-group">
							<button className="login-signup-button">LOGIN/SIGNUP</button>
						</div> */
