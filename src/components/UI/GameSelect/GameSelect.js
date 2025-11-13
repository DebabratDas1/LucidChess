import { useEffect, useState } from "react"; // <-- IMPORT useState
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameSelect.scss";
import mode1Img from "../../../assets/img/select_game_random.png";
// ... other image imports
import song from "../../../assets/audio/gameselect.mp3";
import useSound from "use-sound";

// IMPORT THE NEW BUTTON COMPONENT (Adjust path if necessary)
import { ConnectButton } from "./ConnectButton"; 

export const GameSelect = () => {
  const [playSong] = useSound(song);
  const navigate = useNavigate();
  // 1. State to track the connected wallet
  const [walletAddress, setWalletAddress] = useState(""); 
  
  // 2. Callback function for the button
  const handleWalletChange = (address) => {
      setWalletAddress(address);
  }

  const matchPlayAction = () => {
    // You can now use walletAddress state to check if the user is connected
    navigate("/matchPlay");
    playSong();
  };

  const friendPlayAction = () => {
    navigate("/friendPlay");
    playSong();
  };

  const machinePlayAction = () => {
    navigate("/machinePlay");
    playSong();
  };

  return (
    <div className="GameSelect">
      {/* 3. Render the wallet button in a new positioning container */}
      <div className="top-right-wallet-container"> 
        <ConnectButton onWalletChange={handleWalletChange} />
      </div>
      
      <div className="u-container">
        <div className="u-ribbon">Select game</div>
        <div className="u-content">
          <div className="u-item" onClick={matchPlayAction}>
            <Image className="u-item-image" src={mode1Img}></Image>
            <div className="u-item-text">Match with Random User</div>
          </div>
          <div className="u-item" onClick={friendPlayAction}>
            <Image className="u-item-image" src={mode2Img}></Image>
            <div className="u-item-text">Match with Friend</div>
          </div>
          <div className="u-item" onClick={machinePlayAction}>
            <Image className="u-item-image" src={mode3Img}></Image>
            <div className="u-item-text">Match with Computer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelect;