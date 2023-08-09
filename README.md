# SketchConnect <img align="right" alt="SketchConnect" src="./client/public/assets/images/logo.png" width="300px" height="138px" style="border-radius: 25px;">

Welcome to 'SketchConnect,' the ultimate collaborative doodling game for 4 players. Assigned to unique quadrants, each participant takes turns drawing, only seeing a subset of previous players' work on their aligned edges. Witness the magic of creativity and diversity as the quadrants unite, creating a mesmerizing and (potentially) seamless masterpiece.
<!-- TABLE OF CONTENTS -->

## Table of Contents

-   [Project Task Goals](#project-task-goals)
-   [Course Technology Utilized](#course-technology-utilized)
-   [Above and Beyond](#above-and-beyond)
-   [Next Steps](#next-steps)
-   [License](#open-source-license)
-   [Developed By](#developed-by)
-   [Pull Requests](#pull-requests)
-   [Prototypes](#prototypes)

## Project Task Goals

#### Minimum Requirements

- [x] Creating and storing a session for each game started
- [x] Making it collaborative for 4 players
- [x] A canvas representing a quadrant for each player's individual drawing
- [x] Getting HTML5 Canvas drawing data and storing the images
- [x] Connecting the 4 canvases into a 2x2 grid to form the final image

#### “Standard” Requirements
- [x] Guidelines for subset of previous player's drawings on current player's aligned edges
- [x] Downloadable PNG file of final image
- [x] Option to share final image via social media
- [x] Default timer to complete design
- [x] A randomized drawing prompt per game
- [x] Generate session invite link for other players to join

#### Stretch Requirements
- [x] Additional drawing options such as pen variety, stroke width, colours, etc.
- [x] Oauth (Google) Login
- [x] Hall of Fame on user dashboard displaying final drawings from previous games
- [ ] Public / Private session rooms
- [ ] Group Chat to communicate with other players in-game
- [ ] Configurable Timer / Game Settings
- [ ] Players completed can watch what the other player is doing

## Course Technology Utilized
#### Unit 1: HTML, CSS, JS
The application's web pages were structured using HTML, complemented with CSS for styling. The core logic for handling dynamic interactions and client-side functionality was implemented using JavaScript to create a seamless user experience.
#### Unit 2: React & Redux
The front end of the application utilized React as the library for building interactive user interfaces, offering a component-based architecture to manage UI elements efficiently. For state management, Redux was employed, enabling centralized storage and seamless data sharing among components.
#### Unit 3: Node & Express
Node.js and Express were utilized to set up and operate the server, facilitating smooth communication between the React frontend components and backend services. With Express, handling HTTP requests, defining routes, and managing middleware become more straightforward, enhancing the system's overall efficiency.
#### Unit 4: MongoDB
MongoDB served as the database to efficiently store, retrieve, and modify user and game session data, ensuring data persistence even when the application is closed. Its schema-less and flexible nature, as a NoSQL database, made it a suitable choice for managing the large amounts of data present in the application.
#### Unit 5: Builds & Deployment
Deployment allows the application to be live and accessible from a public URL in which users can interact with SketchConnect. The React front-end was deployed on Vercel and the backend was deployed on Render which are two cloud-based platforms.

## Above and Beyond

#### Image Storage
SketchConnect incorporates many additional features such as cloud storage using Google’s external API, allowing players to save their final drawings.

#### Sharing via Social Media
Additionally, SketchConnect integrates with social media platforms, empowering players to share their final masterpieces with friends and family. 

#### Research-driven UX
In shaping SketchConnect, we prioritized a user-centric approach through conducting thorough UX research and testing with over 50 users. By understanding player preferences (style of online games played, prompts, timer configurations, etc.) we ensured an interface that would be fun, friendly, seamless and intuitive for a delightful collaborative online doodling experience.

#### Authentication
To safeguard user data and maintain a secure environment, the app implements Firebase authentication, providing a hassle-free login and registration process. With these innovative features, SketchConnect promises endless fun, collaboration, and artistic expression for all players.

#### <span>Socket.IO</span> & Change Streams 
<!-- TODO -->
## Next Steps
The next steps to improve the app include adding public/private session rooms for more versatile gameplay, implementing a group chat feature for real-time communication, and introducing configurable timer and game settings to cater to different player preferences. Additionally, enabling a spectator mode will allow completed players to watch others in real time, enhancing the overall gaming experience.

## Open Source License

```
Copyright (C) 2023 Martin Cai, Michelle Kim, Michelle Wang, Shu Ting Hu, Vishal Desh

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

## Developed By

-   [Martin Cai](https://github.com/martincai8)
-   [Michelle Kim](https://github.com/michelleykim)
-   [Michelle Wang](https://github.com/michelle-wangg)
-   [Shu Ting Hu](https://github.com/shuting-hu)
-   [Vishal Desh](https://github.com/VDeshh)

## Pull Requests

1. Just fork a version of this repository, make the changes you want to, and make a pull request.
2. We will review the pull request, and accept or reject any incoming changes after testing.

<!-- further materials (from initial) can remove or keep -->

## Prototypes

<img src="client/public/assets/images/hi-fi/homePage.png" width=600px>
<img src="client/public/assets/images/hi-fi/gameLobbyPage.png" width=600px>
<img src="client/public/assets/images/hi-fi/drawingPage.png" width=600px>
<img src="client/public/assets/images/hi-fi/finishedDrawingPage.png" width=600px>
