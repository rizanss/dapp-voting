"use client";
import { useState, useEffect } from "react";

export default function VotingComponent({ candidates, selectedCandidate, setSelectedCandidate, handleVote }) {
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    console.log("🟢 Candidates received in VotingComponent:", candidates);
  }, [candidates]);

  const handleVoteClick = async () => {
    if (selectedCandidate === null) return alert("Pilih kandidat dulu bro!");
    setIsVoting(true);
    await handleVote();
    setIsVoting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Voting Kandidat 🗳️</h1>
      <p className="mt-2 text-gray-400">Pilih kandidat favoritmu:</p>

      <div className="mt-6 space-y-3">
        {candidates.length === 0 ? (
          <p className="text-gray-500">Memuat kandidat...</p>
        ) : (
          candidates.map((candidate, index) => (
            <button
              key={index}
              className={`px-6 py-3 w-full rounded-lg text-lg font-semibold transition ${
                selectedCandidate === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedCandidate(index)}
            >
              {candidate.name} ({candidate.votes} suara)
            </button>
          ))
        )}
      </div>

      <button
        onClick={handleVoteClick}
        className={`mt-6 px-6 py-3 ${
          isVoting ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
        } rounded-lg text-white font-semibold`}
        disabled={isVoting}
      >
        {isVoting ? "Voting..." : "Submit Vote ✅"}
      </button>
    </div>
  );
}