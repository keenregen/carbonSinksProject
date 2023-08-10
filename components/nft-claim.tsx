import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { NFT_CONTRACT_ADDRESS } from "../const/adresses";
import styles from "../styles/Home.module.css";

export default function NftClaim() {
    const address = useAddress();

    const {
        contract: prizeContract
    } = useContract(NFT_CONTRACT_ADDRESS);
    
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
            <h1>Congratulations!</h1>
            <p style={{marginBottom:"5px"}}>You have answered correctly.</p>
            <Web3Button
                contractAddress={NFT_CONTRACT_ADDRESS}
                action={() => mintWithSignature()}
            >Claim NFT Prize</Web3Button>
            <p style={{marginTop:"5px"}}>NFT Contract Address: {NFT_CONTRACT_ADDRESS}</p>
        </div>
    );
};