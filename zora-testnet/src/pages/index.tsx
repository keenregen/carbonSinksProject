import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../const/adresses";
import Quiz from "../components/quiz";
import NftClaim from "../components/nft-claim";
import zoraGoerliLogo from "../../public/images/zora.png";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const address = useAddress();

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: hasAnswered, isLoading: isHasAnsweredLoading } =
    useContractRead(contract, "hasAnswered", [address]);

  const { data: isCorrect, isLoading: isIsCorrectLoading } = useContractRead(
    contract,
    "isCorrect",
    [address]
  );

  return (
    <div className={styles.container}>
      <ConnectWallet />
      <br></br>
      <Image src={zoraGoerliLogo} alt="Chain Logo" width={100} height={100} />
      <br></br>
      {!isHasAnsweredLoading ? (
        !hasAnswered ? (
          <>
            <p
              className="font-bold"
              style={{ marginBottom: "0", textAlign: "center" }}
            >
              Solve the challenge correctly
              <br />
              and claim the NFT prize
            </p>
            <Quiz />
          </>
        ) : !isIsCorrectLoading && isCorrect ? (
          <NftClaim />
        ) : (
          <div className={styles.card}>
            <h1
              className="font-bold"
              style={{
                fontSize: "33px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              Maybe next time!
            </h1>
            <p
              className="font-bold"
              style={{ marginBottom: "5", textAlign: "center" }}
            >
              You have solved the latest challenge incorrectly.
            </p>
          </div>
        )
      ) : (
        <p className="font-bold" style={{ textAlign: "center" }}>
          Checking for an available
          <br />
          Carbon Sinks challenge
          <br />
          on Zora Goerli chain.
          <br />- Loading -
        </p>
      )}

      <button
        className="mt-5 px-5 py-2 font-bold text-black bg-white rounded-lg hover:bg-green-500"
        onClick={() => router.push("https://carbon-sinks-home.vercel.app/")}
      >
        Back To Homepage
      </button>
    </div>
  );
};

export default Home;
