# flow-with-megmo

View deployed site [here.](http://www.flowwithmegmo.com/)

Flow with Megmo is a full stack landing page and web app built for a yoga instructor who is beginning an online yoga studio. The goal was to build a tool to help manage the process of scheduling, requesting payment, and handling any communications regarding upcoming yoga classes. She needed her students to be able to sign in as a user and register for class, where they would then be able to view and interact with the client's published schedule. Requirements included mobile responsiveness, user authentication, an admin dashboard, a production database, and automated customer email communciation. I built a custom admin dashboard where the yoga teacher is able to create, update, and delete the classes on her schedule through the Zoom API.


The app was built with the MERN stack and leverages Apollo/GraphQL to keep the database and UI in sync. I configured Nodemailer to automate the sending of class links, class updates, and class confirmations to necessary students. I also incorporated the Spotify API to pull in the client's spotify playlists used during class allowing her students to discover the music that inspired their workouts. Flow with Megmo is deployed to Heroku and I continue to provide developmental support.
