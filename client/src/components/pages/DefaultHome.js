import "../../styles/DefaultHome.css";

function DefaultHome() {
	return (
		<div className="default-home view">
			<h2>Welcome!</h2>
			<p className="home-intro">
				I teach weekly(ish) virtual yoga classes and would love for you to join
				me!
			</p>
			<div className="home-flex-container">
			<div className="common-questions">
				<div className="question">
					<header>How does this work?</header>
					<p>
						Browse and register for a scheduled class, receive an email with a
						zoom invite, and pay a class fee. Simple as that!
					</p>
				</div>
				<div className="question">
					<header>What can I expect in your class?</header>
					<p>
						Honestly, an hour long ass-kicking workout in the form of yoga
						sculpt! Yoga sculpt is faster paced than traditional yoga and
						includes (optional) weighted exercises in addition to some cardio
					</p>
				</div>
				<div className="question">
					<header>How often do you teach?</header>
					<p>
						I try my best to teach a class every weekend, generally in the
						mornings, but over time I may add classes whenever possible. I'm
						also a mom and have a full time job!
					</p>
				</div>
				<div className="question">
					<header>How do I pay for class?</header>
					<p>Currently I only accept venmo payments.</p>
				</div>
			</div>
			{/* <img className="home-img" src="https://via.placeholder.com/300"/> */}
			</div>
		</div>
	);
}

export default DefaultHome;
