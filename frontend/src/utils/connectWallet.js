import { ethers } from "ethers";

export async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log("Connected Wallet:", await signer.getAddress());
      return signer;
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  } else {
    alert("MetaMask not detected! Please install MetaMask.");
  }
}