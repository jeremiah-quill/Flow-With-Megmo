import React from "react";
import UserButtons from "../components/UserButtons";

function Home() {
	return (
		<header className="main-header">
			<div className="hero">
				<div className="main-title-container">
				<h1 className="main-title">Flow with Megmo</h1>
					<div className="title-btns">
						<UserButtons />
					</div>
				</div>
			</div>
		</header>
	);
}

export default Home;