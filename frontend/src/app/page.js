import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Selamat Datang di Dapp Voting! 🗳️</h1>
      <p className="mt-4 text-lg text-gray-400">Pilih kandidat favoritmu dengan teknologi Web3!</p>
      
      <Link href="/vote" legacyBehavior>
        <a className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold">
          Mulai Voting
        </a>
      </Link>
    </div>
  );
}