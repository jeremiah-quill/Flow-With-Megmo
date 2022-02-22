import React from "react";
import { CSSTransition } from "react-transition-group";
import Navbar from "./Navbar";
import hamburger from "../images/hamburger.png";


function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
	return (
		<>
			<button
				className="hamburger"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			>
				<img src={hamburger} />
			</button>
			<CSSTransition
				timeout={500}
				in={isSidebarOpen}
				unmountOnExit={true}
				classNames="sidebar-slide"
			>
				<div>
					<div
						className={`modal-backdrop`}
						onClick={() => setIsSidebarOpen(false)}
					></div>
					<div className="sidebar">
						<div className="hero-content hero-content-sidebar">
							<h1 className="hero-title">Flow with Megmo</h1>
						</div>
						<Navbar />
					</div>
				</div>
			</CSSTransition>
		</>
	);
}

export default Sidebar;
