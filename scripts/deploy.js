const hre = require("hardhat");

async function main() {
  const candidates = ["Asep Racing", "Dadang Berantai", "Ardi Malas"]; // Daftar kandidat
  const Voting = await hre.ethers.deployContract("Voting", [candidates]);

  console.log(`Voting contract deployed at: ${await Voting.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});