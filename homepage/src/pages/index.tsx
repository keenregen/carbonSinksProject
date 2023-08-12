import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./styles/Home.module.css";
import { useRouter } from "next/router";
import carbonSinksLogo from "../../public/images/Logo.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Image src={carbonSinksLogo} alt="Chain Logo" width={75} height={75} />
      <h1
        className="font-bold"
        style={{ fontSize: "33px", marginBottom: "0", textAlign: "center" }}
      >
        Carbon Sinks Project
      </h1>
      <p
        className="font-bold"
        style={{ marginBottom: "0", textAlign: "center" }}
      >
        An engaging and educative, daily-challenge-based, <br /> multichain web
        3 project that promotes environmental responsibility
      </p>
      <button
        className="mt-3 px-9 py-5 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        onClick={() => router.push("https://carbon-sinks-a.vercel.app/")}
      >
        Base Goerli Challenge Page
      </button>
      <button
        className="mt-5 px-7 py-5 font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
        onClick={() => router.push("https://carbon-sinks-b.vercel.app/")}
      >
        Mode Sepolia Challenge Page
      </button>
      <button
        className="mt-5 px-4 py-5 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
        onClick={() => router.push("https://carbon-sinks-c.vercel.app/")}
      >
        Optimism Goerli Challenge Page
      </button>
      <button
        className="mt-5 px-9 py-5 font-bold text-white bg-blue-800 rounded-lg hover:bg-blue-900"
        onClick={() => router.push("https://carbon-sinks-d.vercel.app/")}
      >
        Zora Goerli Challenge Page
      </button>
      <br />
      <button
        className="mt-5 px-9 py-3 font-bold text-white bg-purple-800 rounded-lg hover:bg-purple-900"
        onClick={() => router.push("")}
      >
        Bridge Your NFT Prizes
      </button>
      <br />
    </div>
  );
}
