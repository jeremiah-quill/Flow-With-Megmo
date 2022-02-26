import React from "react";
import { CSSTransition } from "react-transition-group";
import { useSidebarContext } from "../utils/contexts/SidebarContext";
import Navbar from "./Navbar";
import hamburger from "../images/hamburger.png";
import {Link} from 'react-router-dom';


function Sidebar() {
	const {isSidebarOpen, setIsSidebarOpen} = useSidebarContext()
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
						<div className="hero-content-sidebar">
							<h1 className="sidebar-title"><Link to={'/'}>Flow with Megmo</Link></h1>
						</div>
						<Navbar />
					</div>
				</div>
			</CSSTransition>
		</>
	);
}

export default Sidebar;
