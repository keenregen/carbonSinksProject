import { Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { NFT_CONTRACT_ADDRESS } from "../const/adresses";
import styles from "../styles/Home.module.css";

export default function NftClaim() {
    const address = useAddress();

    const {
        contract: prizeContract
    } = useContract(NFT_CONTRACT_ADDRESS);

    const { data: nftIdToBeMinted, isLoading: nftIdToBeMintedLoading } = useContractRead(prizeContract, "totalMinted");
    const mintWithSignature = async () => {
        try {
            const signedPayloadReq = await fetch(`/api/server`, {
                method: "POST",
                body: JSON.stringify({
                    claimerAddress: address
                })
            });

            const json = await signedPayloadReq.json();

            if (!signedPayloadReq.ok) {
                alert(json.error);
            }

            const signedPayload = json.signedPayload;

            const prize = await prizeContract?.erc721.signature.mint(signedPayload);

            alert("NFT prize claimed!");
            return prize;
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={styles.card}>
            <h1               className="font-bold"
              style={{
                fontSize: "33px",
                marginBottom: "0",
                textAlign: "center",
              }}>Congratulations!</h1>
            <p className="font-bold" style={{marginBottom:"5px", textAlign: "center"}}>You have solved the latest challenge correctly.</p>
            <Web3Button
                contractAddress={NFT_CONTRACT_ADDRESS}
                action={() => mintWithSignature()}
            >Claim NFT Prize</Web3Button>
            <p style={{marginTop:"5px"}}>NFT Contract Address: {NFT_CONTRACT_ADDRESS}</p>
            {
            !nftIdToBeMintedLoading &&
            <p style={{marginTop:"5px"}}>Next Token Id To Be Claimed: {nftIdToBeMinted.toString()} </p>
            }
            </div>
    );
};