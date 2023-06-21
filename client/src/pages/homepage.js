import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./page.css";
import "./homepage.css";
import Instructions from "../components/Instructions";

function Homepage() {
    // const sessions = useSelector((state) => state.sessions);

    // moving to reducer in next commit
    const sessions = [
        {
            id: 1,
            name: 'ABC',
            occupancy: 1,
        },
        {
            id: 2,
            name: 'XYZ',
            occupancy: 3,
        },
    ];

    return (
        <div className="page">
            <div className="content">
                {/* factor out as a component later, if necessary */}
                <div className="left-pane">
                    <p id="join-session">Join a session</p>
                    {sessions.map((session) => (
                        <button className="session-button">
                            <p className="session-text">{session.name}-{session.id}</p>
                            <p className="session-text">{session.occupancy}/4</p>
                        </button>
                    ))}
                </div>

                <div className="right-pane">
                    <div id="placeholder">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}><Instructions /></div>


                    </div>
                    <button id="start-session-btn">START NEW SESSION</button>
                </div>
            </div>

            <div id="circle"></div>
        </div>
    );
}

export default Homepage;
