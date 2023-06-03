import "./homepage.css";

function Homepage() {
    return (
        <div className="page">
            <div className="content">
                {/* factor out as a component later, if necessary */}
                <div className="left-pane">
                    <p id="join-session">Join a session</p>
                    <div className="session">
                        <p className="session-text">xxx-xxxx</p>
                        <p className="session-text">1/4</p>
                    </div>
                </div>

                <div className="right-pane">
                    {/* add instructional gif/video later */}
                    <div id="placeholder">
                        add instructional gif/video later
                    </div>
                    <button id="start-session-btn">START NEW SESSION</button>
                </div>
            </div>

            <div id="circle"></div>
        </div>
    );
}

export default Homepage;
