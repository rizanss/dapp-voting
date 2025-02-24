const hre = require("hardhat");

async function main() {
  const candidates = ["Asep Racing", "Dadang Berantai", "Ardi Malas"]; // Daftar kandidat
  const Voting = await hre.ethers.deployContract("Voting", [candidates]);

  await Voting.waitForDeployment(); // Tunggu sampai selesai deploy

  const contractAddress = await Voting.getAddress();
  console.log(`✅ Voting contract deployed at: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});