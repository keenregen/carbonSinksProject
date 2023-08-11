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

const Home: NextPage = () => {
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
      {!isHasAnsweredLoading ? (
        !hasAnswered ? (
          <>
            <h1 style={{ marginBottom: "0" }}>Question</h1>
            <p style={{ marginBottom: "0" }}>
              Answer correctly to claim the NFT prize.
            </p>
            <Quiz />
          </>
        ) : !isIsCorrectLoading && isCorrect ? (
          <NftClaim />
        ) : (
          <div className={styles.card}>
            <h1>Maybe next time!</h1>
            <p style={{ marginBottom: "5" }}>You have answered incorrectly.</p>
          </div>
        )
      ) : (
        <p>Checking for an available quiz. Be patient.</p>
      )}

      <button className="mt-3 px-5 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700">
        Back To Homepage
      </button>
    </div>
  );
};

export default Home;
