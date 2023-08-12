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
import optGoerliLogo from "../public/images/opt.png";
import Image from 'next/image';

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
      <Image src={optGoerliLogo} alt="Chain Logo" width={100} height={100}/>
      <br></br>
      {!isHasAnsweredLoading ? (
        !hasAnswered ? (
          <>
            <p style={{ marginBottom: "0", textAlign: "center"  }}>
              Solve the challenge correctly and claim the NFT prize
            </p>
            <Quiz />
          </>
        ) : !isIsCorrectLoading && isCorrect ? (
          <NftClaim />
        ) : (
          <div className={styles.card}>
            <h1>Maybe next time!</h1>
            <p style={{ marginBottom: "5", textAlign: "center" }}>You have solved the latest challenge incorrectly.</p>
          </div>
        )
      ) : (
        <p style={{ textAlign: "center" }}>Checking for an available Carbon Sinks challenge <br /> on Optimism Goerli chain. Be patient.</p>
      )}

      <button className="mt-5 px-5 py-2 font-bold text-black bg-white rounded-lg hover:bg-green-700">
        Back To Homepage
      </button>
    </div>
  );
};

export default Home;