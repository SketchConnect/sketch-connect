import "./homepage.css";

function homepage() {
    return (
        <div>
            <h1>This is home page</h1>

            {/* factor out as a component later, if necessary*/}
            <div className="left-pane">
                <p>Join a session</p>
                <div className="session">
                    <p className="session-id">xxx-xxxx</p>
                    <p className="capacity">1/4</p>
                </div>
            </div>
        </div>
    );
}

export default homepage;