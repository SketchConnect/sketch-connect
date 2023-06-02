import "./homepage.css";

function homepage() {
    return (
        <div>
            <h1>This is home page</h1>

            {/* factor out as a component later, if necessary*/}
            <div className="left-pane">
                <p>Join a session</p>
            </div>
        </div>
    );
}

export default homepage;