"use client";

import { useState, useEffect } from "react";
import useVotingContract from "../hooks/useVotingContract";
import VotingComponent from "../components/VotingComponent";

export default function Vote() {
  const { candidates, vote } = useVotingContract();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (!selectedCandidate) return alert("Pilih kandidat dulu bro!");
    if (isVoting) return; // 🔥 Cegah multiple click saat voting

    setIsVoting(true); // Aktifkan loading state
    try {
      await vote(selectedCandidate.id);
    } catch (error) {
      console.error("Gagal voting:", error);
      alert("Terjadi kesalahan saat voting. Coba lagi!");
    }
    setIsVoting(false); // Matikan loading setelah selesai
  };

  return (
    <VotingComponent
      candidates={candidates}
      selectedCandidate={selectedCandidate}
      setSelectedCandidate={setSelectedCandidate}
      handleVote={handleVote}
      isVoting={isVoting} // 🔥 Kirim ke component biar tombol bisa disable
    />
  );
}