import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractData from "../contracts/VotingABI.json";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Pastikan sudah benar

const useVotingContract = () => {
  const [contract, setContract] = useState(null);
  const [walletClient, setWalletClient] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initContract = async () => {
      if (!window.ethereum) {
        console.error("❌ Metamask tidak terdeteksi!");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contractData.abi, signer);

        setWalletClient(signer);
        setContract(contractInstance);

        console.log("✅ Contract & Wallet Connected!", { contractInstance, signer });
      } catch (error) {
        console.error("❌ Gagal menghubungkan contract atau wallet!", error);
      }
    };

    initContract();
  }, []);

  useEffect(() => {
    const loadCandidates = async () => {
      if (!contract) {
        console.warn("⚠️ Contract belum siap!");
        return;
      }

      try {
        setLoading(true);
        console.log("🔄 Fetching candidates...");

        const result = await contract.getCandidates();
        console.log("✅ Raw Candidates Data:", result);

        if (!result || result.length === 0) {
          console.error("❌ Tidak ada kandidat yang dikembalikan dari kontrak!");
          setCandidates([]);
          return;
        }

        const formattedCandidates = result.map((c, i) => ({
          id: i,
          name: String(c[0]), // Konversi ke String
          votes: Number(c[1]), // Konversi BigInt ke Number
        }));

        console.log("🎯 Formatted Candidates:", formattedCandidates);
        setCandidates(formattedCandidates);
      } catch (error) {
        console.error("❌ Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    if (contract) {
      loadCandidates();
    }
  }, [contract]);

  return { contract, walletClient, candidates, loading };
};

export default useVotingContract;