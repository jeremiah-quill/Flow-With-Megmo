import React from 'react'

function Home() {
  return (
      <div>
    <header className="main-header">
			<div className="hero">
				<div className="hero-content">
					<h1 className="hero-title">Flow with Megmo</h1>
					<div className="login-signup-button-group">
						<button className="login-signup-button">LOGIN/SIGNUP</button>
					</div>
				</div>
			</div>
		</header>
		<main>
			<section className="main-section my-story-section">
				<div className="my-story-content-container">
					<h2 className="section-title">My Story</h2>
					<p className="my-story-content section-content">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
						voluptate similique dolorum, qui doloribus dolore at recusandae
						officia ut tempora expedita id delectus vel nisi alias sed quod quam
						assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Cupiditate ea, aliquid quas vero repellat neque. Nisi explicabo,
						nostrum aliquam quis quos repellendus aperiam dolores totam maiores
						sint, modi, ut placeat?
					</p>
				</div>

				<img className="my-img" src="megmo-yoga2.png" />
			</section>
			<section className="main-section how-it-works-section">
				<div className="yoga-blocks-img">
					<h2 className="section-title">What can you expect from my class?</h2>
					<div className="what-to-expect-container section-content">
						<p className="what-to-expect">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Necessitatibus nisi deleniti voluptate incidunt, quod deserunt
							impedit magnam inventore neque veritatis alias, totam fuga fugiat
							blanditiis culpa dicta, commodi cupiditate minima?
						</p>
						<p className="what-to-expect">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Necessitatibus nisi deleniti voluptate incidunt, quod deserunt
							impedit magnam inventore neque veritatis alias, totam fuga fugiat
							blanditiis culpa dicta, commodi cupiditate minima?
						</p>
						<p className="what-to-expect">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Necessitatibus nisi deleniti voluptate incidunt, quod deserunt
							impedit magnam inventore neque veritatis alias, totam fuga fugiat
							blanditiis culpa dicta, commodi cupiditate minima?
						</p>
					</div>
				</div>
			</section>
			<section className="main-section how-it-works">
				<h2 className="section-title">How does this work?</h2>
				<p className="how-it-works-content section-content">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
					voluptate similique dolorum, qui doloribus dolore at recusandae
					officia ut tempora expedita id delectus vel nisi alias sed quod quam
					assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Cupiditate ea, aliquid quas vero repellat neque. Nisi explicabo,
					nostrum aliquam quis quos repellendus aperiam dolores totam maiores
					sint, modi, ut placeat?
				</p>
			</section>
			<section className="main-section book-private-section">

			</section>
		</main>
		<footer>footer</footer>
        </div>
  )
}

export default Home