import { useState, useEffect } from 'react';
// CORRECTED PATH: Three levels up to src/
import { connectWallet, getCurrentWalletConnected } from '../../../utils/interact.js'; 
import { chainId } from '../../../utils/address'; 

export const ConnectButton = ({ onWalletChange }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkWallet() {
      const { address } = await getCurrentWalletConnected();
      setWalletAddress(address);
      onWalletChange(address); 
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
      });
      window.ethereum.on('chainChanged', (chain) => {
         if (chain !== chainId) {
             console.warn(`Wrong network. Please switch to chainId: ${chainId}`);
         }
      });
    }
  };

  const connectWalletPressed = async () => {
    if (loading || walletAddress.length > 0) return; 
    setLoading(true);
    let walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
    onWalletChange(walletResponse.address);
    setLoading(false);
  };

  const buttonText = loading 
    ? 'Connecting...' 
    : walletAddress.length > 0 
      ? `Connected: ${String(walletAddress).substring(0, 6)}...`
      : 'Connect Wallet';
  
  return (
    <div className='connect-wallet-button' onClick={connectWalletPressed}> 
      {buttonText}
    </div>
  );
};