import "./Page.css";
import "./homepage.css";
import Instructions from "../components/Instructions";

function Homepage() {
    return (
        <div className="page">
            <div className="content">
                {/* factor out as a component later, if necessary */}
                <div className="left-pane">
                    <p id="join-session">Join a session</p>
                    <button className="session-button">
                        <p className="session-text">xxx-xxxx</p>
                        <p className="session-text">1/4</p>
                    </button>
                    <button className="session-button">
                        <p className="session-text">xxx-xxxx</p>
                        <p className="session-text">3/4</p>
                    </button>
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
