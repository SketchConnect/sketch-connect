import * as React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./WaitingPage.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function WaitingPage() {
    const { sessionId } = useParams();
    const players = useSelector((state) => state.sessions[sessionId]);
    const playerCount = players.players.length;

    let imageSource;
    if (playerCount === 1) {
        imageSource = "player1.png";
    } else if (playerCount === 2) {
        imageSource = "player2.png";
    } else if (playerCount === 3) {
        imageSource = "player3.png";
    } else {
        imageSource = "player4.png";
    }

    return (
        <div className="lobby-container">
            <h2>Session xxxx-xxxx is waiting for players to join...</h2>
            <div>
                <img
                    src={"/assets/images/players/" + imageSource}
                    alt="lobby"
                />
            </div>
            <div>
                <button className="invite-button">INVITE</button>
                <NavLink className="start-button" to="/game">
                    START
                </NavLink>
            </div>
        </div>
    );
}

export default WaitingPage;
