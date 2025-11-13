import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameSelect.scss";
import mode1Img from "../../../assets/img/select_game_random.png";
import mode2Img from "../../../assets/img/select_game_friend.png";
import mode3Img from "../../../assets/img/select_game_computer.png";
import song from "../../../assets/audio/gameselect.mp3";
import useSound from "use-sound";

// FINAL FIX: Import the component named 'Connect' and alias it as 'ConnectButton'
import { Connect as ConnectButton } from "../connect/Connect.js"; 

export const GameSelect = () => {
  const [playSong] = useSound(song);
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(""); 
  
  const handleWalletConnected = (address) => {
      setWalletAddress(address);
  }

  const matchPlayAction = () => {
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
      {/* Container for top-right positioning */}
      <div className="top-right-wallet-container"> 
        {/* The tag name remains correct due to the alias above */}
        <ConnectButton onWalletChange={handleWalletConnected} /> 
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