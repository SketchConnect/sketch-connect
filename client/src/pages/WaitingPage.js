import "./WaitingPage.css";


function WaitingPage() {
  const playerCount = 3; // temp hard coded, will retrieve from server based on players joined

  let imageSource;
  if (playerCount === 1) {
    imageSource = 'player1.png';
  } else if (playerCount === 2) {
    imageSource = 'player2.png';
  } else if (playerCount === 3) {
    imageSource = 'player3.png';
  } else {
    imageSource = 'player4.png';
  }

  return (
    <div className="lobby-container">
      <h2>Session xxxx-xxxx is waiting for players to join...</h2>
      <div>
        <img src={"/assets/images/players/" + imageSource} alt="lobby" />
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default WaitingPage;