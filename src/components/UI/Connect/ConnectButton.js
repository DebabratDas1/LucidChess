import { useState, useEffect } from 'react';
import { connectWallet, getCurrentWalletConnected } from '../../../utils/interact.js'; 
import { chainId } from '../../../utils/address'; // Assuming this path is correct

// This component handles connection status and button display
export const ConnectButton = ({ onWalletChange }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("🦊 Connect to Metamask.");

  useEffect(() => {
    async function checkWallet() {
      const { address } = await getCurrentWalletConnected();
      setWalletAddress(address);
      onWalletChange(address); // Notify parent component (GameSelect)
    }
    checkWallet();
    addWalletListener();
  }, []);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        const newAddress = accounts.length > 0 ? accounts[0] : '';
        setWalletAddress(newAddress);
        onWalletChange(newAddress);
        setStatus(newAddress ? 'Wallet connected' : '🦊 Connect to Metamask.');
      });
      window.ethereum.on('chainChanged', (chain) => {
         if (chain !== chainId) {
             setStatus(`Wrong network. Please switch to chainId: ${chainId}`);
         }
      });
    } else {
      setStatus("🦊 You must install Metamask.");
    }
  };

  const connectWalletPressed = async () => {
    if (loading || walletAddress.length > 0) return; 
    setLoading(true);
    let walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
    setStatus(walletResponse.status);
    onWalletChange(walletResponse.address);
    setLoading(false);
  };

  const buttonText = loading 
    ? 'Connecting...' 
    : walletAddress.length > 0 
      ? `Connected: ${String(walletAddress).substring(0, 6)}...` // Show connected state
      : 'Connect Wallet'; // Show connect state
  
  return (
    <div className='connect-wallet-button' onClick={connectWalletPressed}>
      {buttonText}
    </div>
  );
};