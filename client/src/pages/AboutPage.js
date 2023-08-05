import "./page.css";

function AboutPage() {
  return (
    <div className="page">
      <h1>Welcome to SketchConnect!</h1>
      <p>
        Welcome to 'SketchConnect,' the ultimate collaborative doodling game
        for 4 players.
      </p>
      <p>
        Assigned to unique quadrants, each participant takes
        turns drawing, only seeing a subset of previous players' work on
        their aligned edges. 
      </p>
      <p>
        Witness the magic of creativity and diversity
        as the quadrants unite, creating a mesmerizing and (potentially)
        seamless masterpiece.
      </p>
      <br/>
      <h3 style={{textDecoration: "underline"}}>
        You can contribute too!
      </h3>
      <p>If you have comments, feedbacks, cool ideas or any inquiries related to the game, 
        feel free to open an issue on <a href="https://github.com/SketchConnect/sketch-connect/issues" style={{textDecoration: "none"}}>SketchConnect repository (https://github.com/SketchConnect/sketch-connect/issues)</a>.
        Our developers will reply to you directly!
      </p>
      <br/>
      <h1>Happy SketchConnecting!</h1>
    </div>
  );
}

export default AboutPage;
