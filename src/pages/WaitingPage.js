import "./WaitingPage.css";
import Timer from "../components/Timer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function WaitingPage() {
    return (
      <div className="App">
        <h1>
         Time Left
        </h1>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 4, 0]}
          > 
            {Timer}
          </CountdownCircleTimer>
        </div>
      </div>
    );
  }

  export default WaitingPage;